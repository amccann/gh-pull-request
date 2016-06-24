'use babel';
export default class User {
  constructor(serializedState) {
    const { src, name } = serializedState;
    this.src = src;
    this.name = name;
  }

  serialize() {
    return {
      src: this.src,
      name: this.name,
    };
  }
}
