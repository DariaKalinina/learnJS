'use strict';

import Component from '../component.js';

export default class PhonesCatalogue extends Component{
  constructor({ element }) {
    super({ element });
    this._phones = [];
    this._render();
    this._element.addEventListener('click', this._onPhoneSelected.bind(this));
    this._element.addEventListener('click', this._onPhoneAdd.bind(this));
    }

  _render() {
    this._element.innerHTML = `

    <ul class="phones">
      ${
        this._phones.map((phone) => `
                      <li class="thumbnail"
                          data-element="phone"
                          data-phone-id="${ phone.id }">

                        <a href="#!/phones/${ phone.id }"
                           class="thumb">
                          <img alt="${ phone.name }"
                               src="${ phone.imageUrl }">
                        </a>

                        <div class="phones__btn-buy-wrapper">
                          <a class="btn btn-success" data-element="add-button">Add</a>
                        </div>

                        <a href="#!/phones/${ phone.id }" data-element="link">
                          ${ phone.name }
                        </a>

                        <p>${ phone.snippet }</p>
                      </li>
                    `)
                   .join('')
      }
    </ul>
    `
  }

  _onPhoneSelected(event) {
    let link = event.target.closest('[data-element="link"]');
    if(event.target !== link) return;

    let phoneId = link.closest('[data-element="phone"]').dataset.phoneId;

    let customEvent = new CustomEvent('phoneSelected', {
    detail: {phoneId: phoneId}
     });

    this._element.dispatchEvent(customEvent);

  }

  _onPhoneAdd(event) {
      let target = event.target.closest('[data-element="add-button"]');
      if(event.target !== target) return;


      let phone = event.target.closest('[data-element="phone"]');

      let customEvent = new CustomEvent('phoneAdded', {
          detail: {phoneId: phone.dataset.phoneId}
        });

       this._element.dispatchEvent(customEvent);

  }

  setPhones(phones) {
      this._phones = phones;
      if(this._phones === 404) {
        this._element.innerHTML = `<p>Проблема соединения с сервером</p>`;
      } else if(!this._phones.length) {
        this._element.innerHTML = `<p>Нет подходящих товаров!</p>`;
      } else {
        this._render();
      }

  }
}


