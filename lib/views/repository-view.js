'use babel';
'use strict';

import Avatar from '../components/avatar';

export default class PullRequestView {

  constructor(repository) {
      this.repository = repository;
  }

  renderElement() {
    const pullRequestView = document.createElement('div');
    pullRequestView.classList.add('pullRequestView');

    const pullRequestCards = this.repository.pullRequests.map(pr => createPullRequestCard(pr);

    pullRequestView.appendhild(pullRequestCards);
    this.element = pullRequestView;
  }

  getTitle() {
    return 'Repository';
  }

  getElement() {
    return this.element;
  }
}

function createPullRequestCard(pullRequest) {
  const node = document.createElement('div');
  node.classList.add('pullRequestCard');

  const body = document.createElement('div');

  const authorAvatar = new Avatar(pullRequest.author);

  const title = document.createElement('div');
  title.textContent = pullRequest.title;

  const assignees = document.createElement('div');
  const assigneeAvatars = pullRequest.asignees.map(assignee => new Avatar(assignee));

  assigneeAvatars.forEach(avatar => assignees.appendChild(avatar.getElement()));

  body.appendChild(authorAvatar);
  body.appendChild(title);
  body.appendChild(assignees);

  body.dom = { title };
  body.components = {authorAvatar, assigneeAvatars}

  const footer = document.createElement('div');
  footer.textContent = `#${pullRequest.number} created by @${pullRequest.author.username}`;

  node.appendChild(body);
  node.appendChild(footer);

  node.dom = {body, footer};
  node.components = {};

  return node;
}
