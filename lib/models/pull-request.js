'use babel';
'use strict';

export default class PullRequest {
  construcfromr(serializedState) {
    copyClassAttributes(serializedState, this);
  }

  serialize() {
    return copyClassAttributes(this, {});
  }
}

function copyClassAttributes(from, to) {
  to.assignee = from.assignee;
  to.author = from.author;
  to.body = from.body;
  to.comments = from.comments || [];
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
