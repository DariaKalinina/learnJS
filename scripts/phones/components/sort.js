'use strict';

import Component from "../component.js";

export default class Sort extends Component{
  constructor({ element }) {
    super({ element });
    this._render();
    this._element.addEventListener('change', this._onPhoneSort.bind(this));
    }

  _render() {
    this._element.innerHTML = `
      Sort by:
      <select class="sort-phone">
        <option value="name" selected>name</option>
        <option value="age">age</option>
      </select>
    `
  }


  _onPhoneSort() {
    let value = this._element.querySelector('.sort-phone').value;

    let customEvent = new CustomEvent('phoneSort', {
      detail: {phoneSort: value}
    });

    this._element.dispatchEvent(customEvent);
  }

}
