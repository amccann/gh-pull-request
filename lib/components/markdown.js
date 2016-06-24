'use babel';

'use strict';

import { markdown } from 'markdown';

import BaseComponent from './base-component';

const ENTER_KEY = 13;
const ESC_KEY = 27;

export default class Avatar extends BaseComponent {

  constructor(content) {
    super();
    this.content = content;
    this.isEditMode = false;

    this.element = document.createElement('div');
    this.markdownArea = readModeHtmlNode(this.content);

    this.element.appendChild(this.markdownArea)
  }

  editMode(isEditMode) {
    this.markdownArea.remove();

    if(isEditMode) {
      this.markdownArea = editModeHtmlNode(this.content);
      this.markdownArea.dom.saveButton.addEventListener('click', () => {
        this.save();
      });
      this.markdownArea.dom.textarea.addEventListener('keyup', (event) => {
        if (event.keyCode === ESC_KEY) {
          this.cancel();
        }
      });
    } else {
      this.markdownArea = readModeHtmlNode(this.content);
    }

    this.isEditMode = isEditMode;
    this.element.appendChild(this.markdownArea);
  }

  save() {
    const wasEditMode = this.isEditMode;
    if(wasEditMode) {
      //Save the value from edit mode.
      this.content = this.markdownArea.dom.textarea.value;
      this.editMode(false);

      this.notifyAll(this.value());
    }
  }

  cancel() {
    const wasEditMode = this.isEditMode;
    if(wasEditMode) {
      this.editMode(false);
    }
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

function editModeHtmlNode(content) {
  const node = document.createElement('div');

  const textarea = document.createElement('textarea');
  textarea.value = content;

  // This class/attribute is needed to get atom to allow us
  // to press backspace.
  textarea.classList.add('native-key-bindings');
  textarea.setAttribute('tab-index', -1);

  const saveButton = document.createElement('div');
  saveButton.classList.add('button');
  saveButton.textContent = 'Save';

  node.appendChild(textarea);
  node.appendChild(saveButton);

  node.dom = { textarea, saveButton };

  return node;
}
