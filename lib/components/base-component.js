'use babel';

export default class BaseComponent {

  constructor() {
    this.listeners = [];
  }

  destroy() {
    this.listeners = null;
    if(this.element) {
      this.element.remove();
    }
  }

  getElement() {
    return this.element;
  }

  hide() {
    this.element.classList.add('u-hidden');
  }

  show() {
    this.element.classList.remove('u-hidden');
  }

  notifyAll(value) {
    this.listeners.forEach(listener => listener(value));
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners.remove(callback);
  }
}
