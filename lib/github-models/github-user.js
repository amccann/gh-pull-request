'use babel';
'use strict';

import User from '../models/user';

export default class GithubUser extends User {
  constructor(serializedState) {
    this.super();
    this.id = serializedState.id;
  }

  static fromGithubResponse() {
    //Do Stuff;
  }

  serialize() {
    const superSerialized = this.super();
    superSerialized.id = this.id;
  }
}
