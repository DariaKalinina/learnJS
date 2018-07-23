'use strict';

import Component from "../component.js";

export default class ShoppingCart extends Component{
  constructor({ element}) {
    super({ element });
    this._items = [];
    this._render();
    }

  _render() {
    this._element.innerHTML = `
    <p>Shopping Cart</p>
    <ul data-element="cart">
      <li data-element="default-item">Корзина пуста</li>
    </ul>
    `
  }

  addItem(phoneId) {
    let cart = document.querySelector('[data-element="cart"]');
    //let phoneId = id;
    this._items.push(phoneId);

    for (let i = 0; i < this._items.length-1; i++) {
      if (phoneId == this._items[i]) {
        this._items.pop();
      }
    }

    cart.innerHTML =
      `${this._items.map((phoneId) => `
                      <li>
                        <a>
                          ${ phoneId }
                        </a>
                      </li>
                    `)
            .join('')
        }`;
   }


}
