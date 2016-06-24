'use babel';

import BaseComponent from './base-component';

export const AvatarSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

const SizeClassMap = {
  small: 'avatar--small',
  medium: 'avatar--medium',
  large: 'avatar--large',
};

export default class Avatar extends BaseComponent {

  constructor(source, size) {
    super();

    // Create root element
    this.element = document.createElement('img');
    this.element.classList.add('avatar');
    this.element.setAttribute('src', source);

    if(size && SizeClassMap[size]) {
      this.element.classList.add(SizeClassMap[size]);
    }
  }
}
