'use babel';
'use strict';

import PullRequest from './pull-request';
import Comment from './comment';
import GithubClient from '../services/github-client';

export default class Repository {
  constructor() {
    this.pullRequests = [];
  }

  setActivePullRequest(pullRequest) {
    this.activePullRequest = pullRequest;
  }

  fetchPullRequestList() {
    return GithubClient.getPullRequests().then((pullRequests) => {
      this.pullRequests = pullRequests.map((pr) => {
        return new PullRequest(pr);
      });

      return this.pullRequests;
    });
  }

  fetchActivePullRequestsWithComments() {
    if(!this.activePullRequest) {
      return Promise.resolve();
    }

    const fetchFileComments = GithubClient.getPullRequestFileComments(this.activePullRequest.number).then((comments) => {
      this.activePullRequest.fileComments = comments.map((comment) => {
        return new Comment(comment);
      });
    });

    const fetchPullRequestComments = GithubClient.getPullRequestComments(this.activePullRequest.number).then((comments) => {
      this.activePullRequest.pullRequestComments = comments.map((comment) => {
        return new Comment(comment);
      });
    });

    return Promise.all([
      fetchFileComments,
      fetchPullRequestComments,
    ]).then(() => {
      return this.activePullRequest;
    });
  }
}
