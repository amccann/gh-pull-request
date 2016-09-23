'use babel';
'use strict';
import { CompositeDisposable } from 'atom';
import PullRequestView from './views/pull-request-view';
import GithubClient from './services/github-client';
import Repository from './models/repository';

const TOKEN  = ''; //Replace with token.

export default {

  subscriptions: null,

  activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'gh-pull-request:toggle': () => this.toggle()
    }));

    GithubClient.configure('ascend', 'GetJobber', TOKEN);
    this.repository = new Repository({});
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
    };
  },

  toggle() {
    this.repository.fetchPullRequestList().then((list) => {
      this.repository.setActivePullRequest(list[2]);
      this.repository.fetchActivePullRequestsWithComments().then(() => {
        this.renderPullRequestView(this.repository.activePullRequest);
      });
    });
  },

  renderPullRequestView(pullRequest) {
    const activePane = atom.workspace.getActivePane();

    if(!this.PullRequestItem) {
      const prv = new PullRequestView(pullRequest);
      this.PullRequestItem = activePane.addItem(prv, 0);
      activePane.activateItem(prv);
    } else {
      activePane.destroyItem(this.PullRequestItem);
      this.PullRequestItem = null;
    }
  },
};
