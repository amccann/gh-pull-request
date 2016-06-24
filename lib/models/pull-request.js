'use babel';
'use strict';

import User from './user';
import Comment from './comment';

export default class PullRequest {
  construcfromr(serializedState) {
    copyRawAttributes(serializedState, this);

    this.assignee = new User(serializedState.assignee);
    this.author = new User(serializedState.author);
    this.comments = serializedState.comments.map(c => new Comment(c));
  }

  serialize() {
    const rawAttributes = copyRawAttributes(this, {});

    rawAttributes.assignee = this.assignee.serialize();
    rawAttributes.author = this.author.serialize();
    rawAttributes.comments = this.comments.map(c => c.serialize());
  }
}

function copyRawAttributes(from, to) {
  to.body = from.body;
  to.closedAt = from.closedAt;
  to.createdAt = from.createdAt;
  to.mergedAt = from.mergedAt;
  to.number = from.number;
  to.state = from.state;
  to.title = from.title;
  to.updatedAt = from.updatedAt;
  to.url = from.url;

  return to;
}
