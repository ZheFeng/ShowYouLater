import { observable } from "mobx";
export class Member {
  constructor(uid) {
    this.uid = uid;
  }
}

export class Message {
  constructor(sender, text) {
    this.sender = sender;
    this.text = text;
    this.date = Date.now();
  }
}

export class Room {
  @observable key = []
  @observable members = []
  @observable messages = []
  constructor(key, members, messages) {
    this.key = key;
    this.members = members;
    this.messages = messages;
  }
  sendMessage(sender, text) {
    this.messages.push(new Message(sender, text));
  }
}