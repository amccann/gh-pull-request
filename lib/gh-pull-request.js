'use babel';
'use strict';

import CommentCard from './comment-card';
import { CompositeDisposable } from 'atom';

export default {

  ghPullRequestView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.CommentCard = new CommentCard(state.CommentCard);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.CommentCard.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'gh-pull-request:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.CommentCard.destroy();
  },

  serialize() {
    return {
      ghPullRequestViewState: this.CommentCard.serialize()
    };
  },

  toggle() {
    console.log('GhPullRequest was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
