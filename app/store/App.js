import { observable, computed } from "mobx";
import User from './User';
import * as Chat from './Chat';


export default class App {
  @observable rooms = []
  @observable friends = []
  @observable user = null
  @observable checkingAuthState = false
  @computed get isLoggedIn() {
    return this.user != null;
  }
  constructor(firebase) {
    this.firebase = firebase;
    this.database = this.firebase.database();
    this.setChatrooms = this.setChatrooms.bind(this);
    this.setFriends = this.setFriends.bind(this);




    this.database.ref('chatrooms').on('value', this.setChatrooms);
    this.setCurrentUser();
  }
  addFriend(uid) {
    return this.friendsDatabase.push({ uid })
      .then(() => this.firebase.database().ref(`friends/${uid}`).push({ uid: this.user.uid }))
      .then(() => this.firebase.database().ref(`chatrooms`).push({
        members: {
          [uid]: true,
          [this.user.uid]: true
        }
      }));
  }
  setChatrooms(snap) {
    const rooms = [];
    snap.forEach(room => rooms.push(new Chat.Room(room.key, room.val().members)));
    this.rooms = rooms;
  }
  setFriends(snap) {
    const friends = [];
    snap.forEach(friend => friends.push({ ...friend.toJSON(), key: friend.key }));
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
      this.user = new User(user.uid, user.email);
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