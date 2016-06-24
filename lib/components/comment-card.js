'use babel';
'use strict';

import BaseComponent from './base-component';
import Avatar from './avatar';
import Markdown from './markdown';

export default class CommentCard extends BaseComponent {

  constructor(user, markdownContent) {
    super();

    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('commentCard');

    const toolbar = createToolbar();
    const main = createMainBody(user, markdownContent);
    const footer = createFooter(user);

    this.element.appendChild(toolbar);
    this.element.appendChild(main);
    this.element.appendChild(footer);

    toolbar.dom.editButton.addEventListener('click', () => {
      const markdown = main.components.markdown;
      markdown.editMode(true);
      toolbar.dom.editButton.classList.add('u-hidden');
    });

    main.components.markdown.addListener((event) => {
      if(event.action === 'save') {
        this.notifyAll(event.value);
      }

      toolbar.dom.editButton.classList.remove('u-hidden');
    });

    this.toolbar = toolbar;
    this.main = main;
    this.footer = footer;
  }

  inline(isInline = false) {
    if(isInline) {
      this.element.classList.add('commentCard--inline');
      this.main.components.markdown.saveButton(false);
    } else {
      this.element.classList.remove('commentCard--inline');
      this.main.components.markdown.saveButton(true);
    }
  }
}

function createToolbar() {
  const toolbar = document.createElement('div');
  toolbar.classList.add('commentCard-toolbar');

  const editButton = document.createElement('span');
  editButton.classList.add('icon');
  editButton.classList.add('icon--pencil');

  toolbar.appendChild(editButton);

  toolbar.dom = { editButton };
  toolbar.components = {};

  return toolbar;
}

function createMainBody(user, markdownContent) {
  const main = document.createElement('div');
  main.classList.add('commentCard-main');

  const avatar = new Avatar(user.avatar).getElement();

  const markdown = new Markdown(markdownContent || '');
  markdown.getElement().classList.add('commentCard-content');

  main.appendChild(avatar);
  main.appendChild(markdown.getElement());

  main.dom = {};
  main.components = { markdown, avatar };

  return main;
}

function createFooter(user) {
  const footer = document.createElement('div');
  footer.classList.add('commentCard-footer');

  const username = document.createElement('div');
  username.textContent = user.name;

  footer.appendChild(username);

  footer.dom = { username };
  footer.components = {};

  return footer;
}
