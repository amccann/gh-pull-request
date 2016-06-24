'use babel';
'use strict';

import PullRequest from '../models/pull-request';

import CommentCard from '../components/comment-card';

export default class PullRequestView {

  constructor() {
    this.pullRequest = this.getPullRequest();

    this.element = document.createElement('div');
    this.element.classList.add('pullRequestView');
    const title = document.createElement('div');
    title.classList.add('pullRequestView-header');
    title.textContent = this.pullRequest.title;

    const body = new CommentCard(this.pullRequest.author, this.pullRequest.body);
    body.getElement().classList.add('pullRequestView-body');

    const commentCards = this.pullRequest.globalComments().map((comment) => {
      return new CommentCard(comment.user, comment.message);
    });

    const footer = document.createElement('div');
    footer.classList.add('pullRequest-footer');

    this.element.appendChild(title);
    this.element.appendChild(body.getElement());
    commentCards.forEach(c => this.element.appendChild(c.getElement()));

    this.components = { commentCards, body };
    this.dom = { title };
  }

  getPullRequest() {
    const pullRequestJSON = fetchPullRequest();
    return new PullRequest(pullRequestJSON);
  }

  getTitle() {
    return 'Pull Request';
  }

  getElement() {
    return this.element;
  }
}

function fetchCommentList() {
  return [
    {
      id: 9,
      createdAt: "2011-04-14T16:00:49Z",
      file: 'lib/components/avatar.js',
      lineNumber: 4,
      message: "Epic!",
      updatedAt: "2011-04-14T16:00:49Z",
      url: "http://google.ca",
      user: {
        username: 'amccann',
        avatar: 'https://avatars3.githubusercontent.com/u/779421?v=3&u=dc8e248669c81d50a8ba9d481b4a1e3fee813f30&s=140',
        url: 'https://en.wikipedia.org/wiki/Jukka_Turunen',
      },
    },
    {
      id: 99,
      createdAt: "2011-04-15T14:32:49Z",
      file: 'lib/components/base_component.js',
      lineNumber: 1,
      message: "That is a sexy import",
      updatedAt: "2011-04-15T14:32:49Z",
      url: "http://google.ca",
      user: {
        username: 'tophernuts',
        avatar: 'https://avatars0.githubusercontent.com/u/4359781?v=3&s=140',
        url: 'https://en.wikipedia.org/wiki/Joys_(shipwreck)',
      },
    },
    {
      id: 999,
      createdAt: "2011-04-15T14:32:49Z",
      file: null,
      lineNumber: null,
      message: "The old userSelect functionality would keep state (is a modal up or not?), via query params, so it could persist after a refresh, is that fine we're taking it out?\n\n(I think it is, I just wanted to make sure you knew)\n\nThis introduces some differences like:\n## When saving a visit, if you hit the user selector as it is saving:\n\n### Previously on master:\n* The user selector would become closed, but then the next time you went to edit that visit it would be open again\n\n### Nowadays everybody wanna talk like they got something to say\n* The user selector stays up, and won't go away until you close it (anyone else you select/unselect don't matter)\n\n## One reason why we probably did that:\nIf you were to:\n* Go edit a visit\n* Open the user selector to add more people\n* Hit the back button to close the user selector\n\nInstead of closing the user selector, we go back to the visit show route, all the while keeping the user selector up\n\n* You can also close the app by pressing back button while switching users, but this is the same as the old behaviour\n* Property select and line item select work perfectly with back button though",
      updatedAt: "2011-04-15T14:32:49Z",
      url: "http://google.ca",
      user: {
        username: 'tophernuts',
        avatar: 'https://avatars0.githubusercontent.com/u/4359781?v=3&s=140',
        url: 'https://en.wikipedia.org/wiki/Joys_(shipwreck)',
      },
    },
    {
      id: 9999,
      createdAt: "2011-04-15T14:33:49Z",
      file: null,
      lineNumber: null,
      message: "Oooooh Pretty",
      updatedAt: "2011-04-15T14:33:49Z",
      url: "http://google.ca",
      user: {
        username: 'amccann',
        avatar: 'https://avatars3.githubusercontent.com/u/779421?v=3&u=dc8e248669c81d50a8ba9d481b4a1e3fee813f30&s=140',
        url: 'https://en.wikipedia.org/wiki/Jukka_Turunen',
      },
    },
  ];
}

function fetchPullRequest() {
  return {
    id: 1,
    assignee: {
      username: 'tophernuts',
      avatar: 'https://avatars0.githubusercontent.com/u/4359781?v=3&s=140',
      url: 'https://en.wikipedia.org/wiki/Joys_(shipwreck)',
    },

    author: {
      username: 'amccann',
      avatar: 'https://avatars3.githubusercontent.com/u/779421?v=3&u=dc8e248669c81d50a8ba9d481b4a1e3fee813f30&s=140',
      url: 'https://en.wikipedia.org/wiki/Jukka_Turunen',
    },

    body: "# What's in this PR?\n- Moved `modal-select` into a mixin instead of being it's own component\n- Moved the `user-select` modal into a component that inherits from `modal-select`\n- Moved `property-select` into it's own component instead of just using `modal-select` component (that's now a mixin) \n- Cleaned up the separation of concerns between `modal-select` decendants and the `full-screen-select` modal.\n\n# QA\n- [x] This has been QA'd by the PR owner\n- [ ] This has been QA'd by an approver\n\n# References\n",

    comments: fetchCommentList(),
    closedAt: null,
    createdAt: "2011-03-15T14:32:49Z",
    mergedAt: null,
    number: 12,
    state: 'open',
    title: 'A title for this PR',
    updatedAt: "2011-03-15T14:32:49Z",
    url: 'http://google.ca',
  };
}
