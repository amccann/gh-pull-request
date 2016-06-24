'use babel';

import BaseComponent from './base-component';
import Avatar from './avatar';
import Markdown from './markdown';

export default class CommentCard extends BaseComponent {

  constructor(user, markdownContent) {
    super();
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('commentCard');

    const main = document.createElement('div');
    main.classList.add('commentCard-main');

    const avatar = new Avatar(user.src).getElement();

    // Create message element
    const markdown = new Markdown(markdownContent).getElement();
    markdown.classList.add('commentCard-content');

    main.appendChild(avatar);
    main.appendChild(markdown);

    const footer = document.createElement('div');
    footer.classList.add('commentCard-footer');
    footer.textContent = user.name;

    this.element.appendChild(main);
    this.element.appendChild(footer);
  }

  inline(isInline = false) {
    if(isInline) {
      this.element.classList.add('commentCard--inline');
    } else {
      this.element.classList.remove('commentCard--inline');
    }
  }

}
