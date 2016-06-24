'use babel';
'use strict';

import { markdown } from 'markdown';

import BaseComponent from './base-component';

export default class Avatar extends BaseComponent {

  constructor(content) {
    super();
    this.originalContent = content;

    this.element = document.createElement('div');
    this.markdownArea = readModeHtmlNode(this.originalContent);

    this.element.appendChild(this.markdownArea)
  }

  editMode(isEditMode) {
    this.markdownArea.remove();

    if(isEditMode) {
      this.markdownArea = editModeHtmlNode(this.originalContent);
    } else {
      this.markdownArea = readModeHtmlNode(this.originalContent);
    }
    this.element.appendChild(this.markdownArea)
  }
}

function readModeHtmlNode(content) {
  const node = document.createElement('div');
  node.innerHTML = markdown.toHTML(content);

  return node;
}

function editModeHtmlNode(content) {
  const node = document.createElement('textarea');
  node.setAttribute(content);

  return node;
}
