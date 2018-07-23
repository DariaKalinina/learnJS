'use strict';

let BASE_API_URL = 'https://mgrinko.github.io/js-20180329-1900/api';

const PhonesService = {
  loadPhones(filter, callback) {
    this._sendRequest('/phones')
      .then(phones => {
        const filteredPhones = this._filter(phones, filter.search);
        const sortedPhones = this._sort(filteredPhones, filter.sort);

        return callback(sortedPhones);
      })
      .catch(error => {
        return callback(error.code);
      });
  },

  loadPhoneOne(phoneId, callback) {
    this._sendRequest(`/phones/${phoneId}`)
      .then(phones => {
        return callback(phones);
      })
      .catch(error => {
        return callback(error.code);

      });
  },

  _filter(phones, search) {
    if (!search) {
      return phones;
    }

    let normalizedQuery = search.toLowerCase();

    return phones.filter((phone) => {
      return phone.name.toLowerCase().includes(normalizedQuery);
    });
  },

  _sort(phones, orderField) {
    return phones.sort((phoneA, phoneB) => {
      return (phoneA[orderField] > phoneB[orderField])
        ? 1
        : -1;
    });
  },

  _sendRequest(url, {method = 'GET'}={}) {
    return new Promise( function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      let fullUrl = BASE_API_URL + url + '.json';
      xhr.open(method, fullUrl, true);
      xhr.send();
      xhr.onload = function() {
        if (this.status === 200) {
          let data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          let error = new Error(this.statusText);
          console.log(this.status);
          error.code = this.status;
          reject(error);
        }
      };

      xhr.onerror = function() {
        reject(new Error("Network Error"));
      };
    });
  }



 };

export default PhonesService;
