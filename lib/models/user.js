'use babel';
'use strict';

export default class User {
  constructor(serializedState) {
    copyClassAttributes(serializedState, this);
  }

  serialize() {
    return copyClassAttributes(this, {});
  }
}

function copyClassAttributes(from, to) {
  to.username = from.username;
  to.avatar = from.avatar;
  to.url = from.url;

  return to;
}
