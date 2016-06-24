'use babel';
'use strict';

import PullRequest from '../models/pull-request';

export default class GithubPullRequest {
  constructor(serializedState) {
    this.id = serializedState.id;
    this.pullRequest = new PullRequest(serializedState.user);
  }

  static fromGithubResponse() {
    //Do Stuff;
  }

  serialize() {
    return {
      id: this.id,
      user: this.pullRequest.serialize(),
    };
  }
}
