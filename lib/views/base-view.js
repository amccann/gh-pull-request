'use babel';

export default class BaseView {

  constructor() {
  }

  destroy() {
    if(this.element) {
      this.element.remove();
    }
  }

  getElement() {
    return this.element;
  }
}
