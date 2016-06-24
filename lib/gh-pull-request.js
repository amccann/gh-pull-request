'use babel';
'use strict';
import { CompositeDisposable } from 'atom';

import CommentCard from './components/comment-card';
import User from './models/user';

const AVATAR_SOURCE = 'https://avatars3.githubusercontent.com/u/779421?v=3&u=dc8e248669c81d50a8ba9d481b4a1e3fee813f30&s=140';
const MESSAGE = "# What's in this PR?\n- Moved `modal-select` into a mixin instead of being it's own component\n- Moved the `user-select` modal into a component that inherits from `modal-select`\n- Moved `property-select` into it's own component instead of just using `modal-select` component (that's now a mixin) \n- Cleaned up the separation of concerns between `modal-select` decendants and the `full-screen-select` modal.\n\n# QA\n- [x] This has been QA'd by the PR owner\n- [ ] This has been QA'd by an approver\n\n# References\n";

const USER_NAME = '@amccann';

export default {

  modalPanel: null,
  subscriptions: null,

  activate() {
    const user = new User({
      src: AVATAR_SOURCE,
      name: USER_NAME,
    });
    const card = new CommentCard(user, MESSAGE);
    card.inline(true);
    
    this.modalPanel = atom.workspace.addModalPanel({
      item: card.getElement(),
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
    };
  },

  toggle() {

    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
