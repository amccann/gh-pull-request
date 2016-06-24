'use babel';
'use strict';

import User from './user';

export default class Comment {
  constructor(serializedState) {
    copyRawAttributes(serializedState, this)
    this.user = new User(serializedState.user);
  }

  serialize() {
    const rawAttributes = copyRawAttributes(this, {});
    rawAttributes.user = this.user.serialize();
  }
}

function copyRawAttributes(from, to) {
  to.createdAt = from.createdAt;
  to.file = from.file;
  to.lineNumber = from.lineNumber;
  to.message = from.message;
  to.updatedAt = from.updatedAt;
  to.url = from.url;
  to.user = from.user;

  return to;
}
