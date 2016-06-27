'use babel';

'use strict';

import { markdown } from 'markdown';

import BaseComponent from './base-component';

export default class Markdown extends BaseComponent {

  constructor(content) {
    super();
    this.content = content;

    this.element = document.createElement('div');
    this.markdownArea = readModeHtmlNode(this.content);

    this.element.appendChild(this.markdownArea);
  }

  value() {
    return this.content;
  }
}

function readModeHtmlNode(content) {
  const node = document.createElement('div');
  node.innerHTML = markdown.toHTML(content);

  return node;
}
