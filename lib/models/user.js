'use babel';
'use strict';

export default class User {
  constructor(githubJson) {
    Object.assign(this, deserialize(githubJson));
  }
}

function deserialize(json) {
  return {
    id: json.id,
    username: json.login,
    avatar: json.avatar_url,
    url: json.url,
  };
}
