'use babel';
'use strict';

import User from './user';

export default class Comment {
  constructor(githubJson) {
    Object.assign(this, deserialize(githubJson));
  }
}

function deserialize(json) {
  return {
    id: json.id,

    createdAt: json.created_at,
    file: json.path,
    lineNumber: null, //TODO: Parse this from the diff hunk
    message: json.body,
    updatedAt: json.updated_at,
    url: json.url,
    user: new User(json.user),
  };
}
