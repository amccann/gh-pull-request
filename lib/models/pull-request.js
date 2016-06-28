'use babel';
'use strict';

import User from './user';

export default class PullRequest {
  constructor(githubJson) {
    Object.assign(this, deserialize(githubJson));
  }
}

function deserialize(json) {
  return {
    id: json.id,

    assignees: json.assignees.map((a) => new User(a)),
    author: new User(json.user),
    body: json.body,
    comments: [],
    fileComments: [],
    closedAt: json.closed_at,
    createdAt: json.created_at,
    mergedAt: json.merged_at,
    number: json.number,
    state: json.state,
    title: json.title,
    updatedAt: json.updatedAt,
    url: json.url,
  };
}
