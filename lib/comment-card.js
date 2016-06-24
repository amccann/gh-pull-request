'use babel';

const AVATAR_SOURCE = 'https://avatars3.githubusercontent.com/u/779421?v=3&u=dc8e248669c81d50a8ba9d481b4a1e3fee813f30&s=140';
const MESSAGE = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
`;

const USER_NAME = '@amccann';

export default class CommentCard {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('commentCard');
    this.element.classList.add('commentCard--inline');

    const main = document.createElement('div');
    main.classList.add('commentCard-main');

    const avatar = document.createElement('img');
    avatar.classList.add('avatar');
    avatar.src = AVATAR_SOURCE;

    // Create message element
    const message = document.createElement('div');
    message.classList.add('commentCard-content');
    message.textContent = MESSAGE;

    main.appendChild(avatar);
    main.appendChild(message);

    const footer = document.createElement('div');
    footer.classList.add('commentCard-footer');
    footer.textContent = USER_NAME;

    this.element.appendChild(main);
    this.element.appendChild(footer);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
