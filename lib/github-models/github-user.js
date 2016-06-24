'use babel';
'use strict';

import User from '../models/user';

export default class GithubUser {
  constructor(serializedState) {
    this.id = serializedState.id;
    this.user = new User(serializedState.user);
  }

  static fromGithubResponse() {
    //Do Stuff;
  }

  serialize() {
    return {
      id: this.id,
      user: this.user.serialize(),
    };
  }
}
