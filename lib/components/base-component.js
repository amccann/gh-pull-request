'use babel';

export default class BaseComponent {
  destroy() {
    if(this.element) {
      this.element.remove();
    }
  }

  getElement() {
    return this.element;
  }
}
