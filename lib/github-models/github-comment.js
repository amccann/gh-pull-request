'use babel';
'use strict';

import Comment from '../models/comment';

export default class GithubComment {
  constructor(serializedState) {
    this.id = serializedState.id;
    this.comment = new Comment(serializedState.comment);
  }

  static fromGithubResponse() {
    //Do Stuff;
  }

  serialize() {
    return {
      id: this.id,
      comment: this.comment.serialize(),
    };
  }
}
