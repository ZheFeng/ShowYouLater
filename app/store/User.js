import { observable, computed } from "mobx";


export default class User {
  @observable uid = null
  @observable email = null
  @observable name = null
  constructor(uid, email) {
    this.uid = uid;
    this.email = email;
  }
}