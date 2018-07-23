'use strict';

import Component from '../component.js';

export default class Search extends Component{
  constructor({ element }) {
    super({ element });
    this._render();
    this._element.addEventListener('input', this._onPhoneSearch.bind(this));
    }

  _render() {
    this._element.innerHTML = `
    Search:
    <input>
    `
  }

   _onPhoneSearch(event) {
     let value = event.target.value.toLowerCase();

     let customEvent = new CustomEvent('phoneSearch', {
       detail: {phoneSearch: value}
     });

     this._element.dispatchEvent(customEvent);
   }

}
