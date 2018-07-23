'use strict';

import PhonesService from './services/phones-service.js';
import PhonesCatalogue from './components/phones-catalog.js';
import PhoneViewer from './components/viewer.js';
import Sort from './components/sort.js';
import Search from './components/search.js';
import ShoppingCart from './components/shopping-cart.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._filter = {
      search: '',
      sort: 'name'
    };

    this._refreshPage();
    this._initCatalog();
    this._initViewer();
    this._initSort();
    this._initSearch();
    this._initShoppingCart();

  }

  _refreshPage() {
    const callback = (phones) => {
      this._catalogue.setPhones(phones);
    };
    PhonesService.loadPhones(this._filter, callback)
  }

  _initCatalog() {
    this._catalogue = new PhonesCatalogue({
      element: this._element.querySelector('[data-component="phones-catalog"]')
    });

    this._catalogue.on('phoneSelected', (event) => {
      PhonesService.loadPhoneOne(event.detail.phoneId, (phone) => {
        this._viewer.show(phone);
        this._catalogue.hide();

       });

    });

    this._catalogue.on('phoneAdded', (event) => {
      this._shoppingCart.addItem(event.detail.phoneId);
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.on('phoneAdded', (event) => {
      this._shoppingCart.addItem(event.detail.phoneId);
    });

    this._viewer.on('back', () => {
      this._catalogue.show();
      this._viewer.hide();
    });
  }

  _initSort() {
    this._sort = new Sort({
      element: this._element.querySelector('[data-component="sort"]'),
    });

    this._sort.on('phoneSort', (event) => {
      this._filter.sort = event.detail.phoneSort;
      this._refreshPage();
    });
  }

  _initSearch() {
    this._search = new Search({
      element: this._element.querySelector('[data-component="search"]'),
    });

    this._search.on('phoneSearch', (event) => {
      this._filter.search = event.detail.phoneSearch;
      this._refreshPage();
    });
  }

  _initShoppingCart() {
    this._shoppingCart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
  }






}
