'use babel';
'use strict';

import BaseComponent from './base-component';
import Avatar from './avatar';
import Markdown from './markdown';
import InputArea from './input-area';

export default class CommentCard extends BaseComponent {

  constructor(user, markdownContent) {
    super();

    this.content = markdownContent;

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
      this._editMode(true);
    });

    main.components.inputArea.addListener((event) => {
      if(event.action === 'save') {
        this.content = event.value;
        this.notifyAll(this.content);
      }

       this._editMode(false);
    });

    this.toolbar = toolbar;
    this.main = main;
    this.footer = footer;
  }

  inline(isInline) {
    if(isInline) {
      this.element.classList.add('commentCard--inline');
      this.main.components.inputArea.saveButton(false);
    } else {
      this.element.classList.remove('commentCard--inline');
      this.main.components.inputArea.saveButton(true);
    }
  }

  _editMode(isEditMode) {
    if(isEditMode) {
      this.main.components.inputArea.content = this.content;

      this.main.components.markdown.hide();
      this.main.components.inputArea.show();
      this.toolbar.dom.editButton.classList.add('u-hidden');
    } else {
      this.main.components.markdown.content = this.content;

      this.main.components.markdown.show();
      this.main.components.inputArea.hide();
      this.toolbar.dom.editButton.classList.remove('u-hidden');
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

  const inputArea = new InputArea(markdownContent);
  inputArea.getElement().classList.add('commentCard-content');
  inputArea.hide();

  main.appendChild(avatar);
  main.appendChild(markdown.getElement());
  main.appendChild(inputArea.getElement());

  main.dom = {};
  main.components = { markdown, avatar, inputArea };

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
