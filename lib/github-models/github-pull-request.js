'use babel';
'use strict';

import PullRequest from '../models/pull-request';

export default class GithubPullRequest extends PullRequest {
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
