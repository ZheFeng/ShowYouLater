import { observable, computed } from "mobx";

export default class User {
  @observable friends = []
  @observable user = null
  @observable checkingAuthState = false
  @computed get isLoggedIn() {
    return this.user != null;
  }
  constructor(firebase) {
    this.firebase = firebase;
    this.setFriends = this.setFriends.bind(this);
    this.setCurrentUser();
  }
  addFriend(uid) {
    return this.friendsDatabase.push({ uid });
  }
  setFriends(snap) {
    const friends = [];
    snap.forEach(friend => {
      friends.push({ ...friend.toJSON() })
    });
    this.friends = friends;
  }
  setFriendsDatabase() {
    if (this.friendsDatabase) {
      this.friendsDatabase.off('value', this.setFriends);
    }
    if (this.user) {
      this.friendsDatabase = this.firebase.database().ref(`friends/${this.user.uid}`);
      this.friendsDatabase.on('value', this.setFriends);
    }
  }
  setCurrentUser() {
    this.checkingAuthState = true;
    return this.firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      this.setFriendsDatabase();
      this.checkingAuthState = false;
    });
  }
  createUserWithEmailAndPassword(email, password) {
    return this.firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  signInWithEmailAndPassword(email, password) {
    return this.firebase.auth().signInWithEmailAndPassword(email, password);
  }
  signOut() {
    return this.firebase.auth().signOut();
  }
  toJSON() {
    const userJSON = this.user ? this.user.toJSON() : {};
    return { ...userJSON, checkingAuthState: this.checkingAuthState, isLoggedIn: this.isLoggedIn };
  }
}