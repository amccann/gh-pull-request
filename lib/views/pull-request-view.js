'use babel';
'use strict';

import CommentCard from '../components/comment-card';

export default class PullRequestView {

  constructor(pullRequest) {
    this.pullRequest = pullRequest;
    this.renderElement();
  }

  renderElement() {
    const pullRequestView = document.createElement('div');
    pullRequestView.classList.add('pullRequestView');

    const title = document.createElement('div');
    title.classList.add('pullRequestView-header');
    title.textContent = this.pullRequest.title;

    const body = new CommentCard(this.pullRequest.author, this.pullRequest.body);
    body.getElement().classList.add('pullRequestView-body');

    const commentCards = this.pullRequest.comments.map((comment) => {
      return new CommentCard(comment.user, comment.message);
    });

    const footer = document.createElement('div');
    footer.classList.add('pullRequest-footer');

    pullRequestView.appendChild(title);
    pullRequestView.appendChild(body.getElement());
    commentCards.forEach(c => pullRequestView.appendChild(c.getElement()));

    if(this.element) {
      this.element.remove();
    }

    this.element = pullRequestView;
    this.components = { commentCards, body };
    this.dom = { title };
  }

  getTitle() {
    return this.pullRequest.title;
  }

  getElement() {
    return this.element;
  }
}
