'use babel';
'use strict';

import Comment from '../models/comment';

export default class GithubComment extends Comment {
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
