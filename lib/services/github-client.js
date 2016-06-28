'use babel';

import GitHubApi from 'github';

class GithubClient {
  constructor() {
    this.api = new GitHubApi({
      // optional
      debug: true,
      protocol: 'https',
      host: 'api.github.com',
      timeout: 5000,
      headers: {
          'user-agent': 'atom-pull-request-plugin'
      },
      followRedirects: false,
    });
  }

  configure(repository, owner, token) {
    if(!repository || !owner || !token) {
      throw 'configuration requires repository, owner, and token';
    }

    this.config = {};
    this.config.repository = repository;
    this.config.owner = owner;
    this.config.token = token;

    this.api.authenticate({
      type: 'oauth',
      token: this.config.token,
    });
  }

  getPullRequests() {
    if(!this.config) {
      throw 'Must `configure` GithubClient';
    }

    return new Promise((resolve, reject) => {
      this.api.pullRequests.getAll({
        repo: this.config.repository,
        user: this.config.owner
      }, (err, resp) => {
        if(err) {
          reject(err);
        } else {
          resolve(resp)
        }
      });
    });
  }

  getPullRequestComments(number) {
    if(!this.config) {
      throw 'Must `configure` GithubClient';
    }

    return new Promise((resolve, reject) => {
      this.api.issues.getComments({
        repo: this.config.repository,
        user: this.config.owner,
        number: number,
      }, (err, resp) => {
        if(err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    });
  }

  getPullRequestFileComments(number) {
    if(!this.config) {
      throw 'Must `configure` GithubClient';
    }

    return new Promise((resolve, reject) => {
      this.api.pullRequests.getComments({
        repo: this.config.repository,
        user: this.config.owner,
        number: number,
      }, (err, resp) => {
        if(err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    });
  }
}

export default new GithubClient();
