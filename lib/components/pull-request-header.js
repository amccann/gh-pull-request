'use babel';

import BaseComponent from './base-component';
import Avatar from './avatar';

export default class PullRequestHeader extends BaseComponent {

  constructor(source, size) {
    super();

    // Create root element
    this.element = document.createElement('img');
    this.element.classList.add('pull-request-header');
    this.element.setAttribute('src', source);

    if(size && SizeClassMap[size]) {
      this.element.classList.add(SizeClassMap[size]);
    }
  }
}
  
