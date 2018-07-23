'use strict';

export default class Component {
  constructor({element}) {
    this._element = element;
  }

  on(eventName, callback) {
    this._element.addEventListener(eventName, callback);
  }

}