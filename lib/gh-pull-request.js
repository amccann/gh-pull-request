'use babel';
'use strict';
import { CompositeDisposable } from 'atom';
import PullRequestView from './views/pull-request-view';

export default {

  subscriptions: null,

  activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'gh-pull-request:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
    };
  },

  toggle() {
    const activePane = atom.workspace.getActivePane();

    if(!this.PullRequestItem) {
      const prv = new PullRequestView();
      this.PullRequestItem = activePane.addItem(prv, 0);
      activePane.activateItem(prv);
    } else {
      activePane.destroyItem(this.PullRequestItem);
      this.PullRequestItem = null;
    }
  }

};
