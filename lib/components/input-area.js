'use babel';

'use strict';

import BaseComponent from './base-component';

const ENTER_KEY = 13;
const ESC_KEY = 27;

export default class InputArea extends BaseComponent {

  constructor(content) {
    super();
    this.content = content;
    this.hasSaveButton = true;

    this.element = document.createElement('div');

    const inputArea = editModeHtmlNode(this.content, this.hasSaveButton);
    inputArea.dom.saveButton.addEventListener('click', () => {
      this.save();
    });
    inputArea.dom.textarea.addEventListener('keydown', (event) => {
      this._handleKeyUp(event);
    });

    this.element.appendChild(inputArea);
  }

  saveButton(hasSaveButton) {
    this.hasSaveButton = hasSaveButton;
  }

  save() {
    //Save the value from edit mode.
    this.notifyAll({
      action: 'save',
      value: this.value(),
    });
  }

  cancel() {
    this.notifyAll({
      action: 'cancel',
    });
  }

  value() {
    return this.content;
  }

  // Private //
  _handleKeyUp(event) {
    const hasSaveButton = this.hasSaveButton;
    const hasModfier = event.shiftKey;
    const isEnterKey = event.keyCode === ENTER_KEY;

    if(!hasSaveButton && !hasModfier && isEnterKey) {
      //Don't want the enter registering with the input area.
      event.stopPropagation();
      event.preventDefault();

      this.save();
    } else if (event.keyCode === ESC_KEY) {
      this.cancel();
    }
  }
}

function editModeHtmlNode(content, hasSaveButton) {
  const node = document.createElement('div');

  const textarea = document.createElement('textarea');
  textarea.value = content;

  // This class/attribute is needed to get atom to allow us
  // to press backspace.
  textarea.classList.add('native-key-bindings');
  textarea.setAttribute('tab-index', -1);

  const saveButton = document.createElement('div');
  saveButton.classList.add('button');

  if(!hasSaveButton) {
    saveButton.classList.add('u-hidden');
  }

  saveButton.textContent = 'Save';

  node.appendChild(textarea);
  node.appendChild(saveButton);

  node.dom = { textarea, saveButton };

  return node;
}
