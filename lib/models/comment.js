'use babel';
'use strict';

export default class Comment {
  construcfromr(serializedState) {
    copyClassAttributes(serializedState, this);
  }

  serialize() {
    return copyClassAttributes(this, {});
  }
}

function copyClassAttributes(from, to) {
  to.createdAt = from.createdAt;
  to.file = from.file;
  to.lineNumber = from.lineNumber;
  to.message = from.message;
  to.updatedAt = from.updatedAt;
  to.url = from.url;
  to.user = from.user;

  return to;
}
