'use strict';

import Component from '../component.js';

export default class PhoneViewer extends Component {
  constructor({element}) {
    super({element});
    this._phone = [];
    this._element.addEventListener('click', this._onPhoneAdd.bind(this));
    this._element.addEventListener('click', this._onBackList.bind(this));
    this._element.addEventListener('click', this._galleryClick.bind(this));
  }

  show(phone) {
    this._phone = phone;

    if(this._phone === 404) {
      this._element.innerHTML = `
          <button data-element="back-button">Back to list</button>
          <p>Проблема соединения с сервером</p>`;
    } else {
      this._render();
    }

    super.show();
  }

  _render() {
    let phone = this._phone;

    this._element.innerHTML = `
          <div data-element="show">
          
          <img class="phone bigImage" src="${ phone.images[0]}">

          <button data-element="back-button">Back to list</button>
          <button data-element="add-button">Add to basket</button>


          <h1 data-element="phone"
              data-phone-id="${ phone.id }">${ phone.name }</h1>

          <p>${ phone.description }</p>
          
          <ul class="phone-thumbs gallery">
                 ${ phone.images.map( (imgURL) => `
                  <li>
                    <img class="gallery__smallImage" src="${imgURL}">
                  </li>
                  `)
                  .join(``)} 
          </ul>
          
          <ul class="specs">
            <li>
              <span>Availability and Networks</span>
              <dl>
                <dt>Availability</dt>
                <dd>${ phone.availability.join(' ') }</dd>
              </dl>
            </li>
            <li>
              <span>Battery</span>
              <dl>
                <dt>Type</dt>
                <dd>${ phone.battery.type }</dd>
                <dt>Talk Time</dt>
                <dd>${ phone.battery.talkTime }</dd>
                <dt>Standby time (max)</dt>
                <dd>${ phone.battery.standbyTime }</dd>
              </dl>
            </li>
            <li>
              <span>Storage and Memory</span>
              <dl>
                <dt>RAM</dt>
                <dd>${ phone.storage.ram }</dd>
                <dt>Internal Storage</dt>
                <dd>${ phone.storage.flash }</dd>
              </dl>
            </li>
            <li>
              <span>Connectivity</span>
              <dl>
                <dt>Network Support</dt>
                <dd>${ phone.connectivity.cell }</dd>
                <dt>WiFi</dt>
                <dd>${ phone.connectivity.wifi }</dd>
                <dt>Bluetooth</dt>
                <dd>${ phone.connectivity.bluetooth }</dd>
                <dt>Infrared</dt>
                <dd>${ phone.connectivity.infrared ? '✓' : '✘' }</dd>
                <dt>GPS</dt>
                <dd>${ phone.connectivity.gps ? '✓' : '✘' }</dd>
              </dl>
            </li>
            <li>
              <span>Android</span>
              <dl>
                <dt>OS Version</dt>
                <dd>${ phone.android.os }</dd>
                <dt>UI</dt>
                <dd>${ phone.android.ui }</dd>
              </dl>
            </li>
            <li>
              <span>Size and Weight</span>
              <dl>
                <dt>Dimensions</dt>
                <dd>${ phone.sizeAndWeight.dimensions[0] }</dd>
                <dd>${ phone.sizeAndWeight.dimensions[1] }</dd>
                <dd>${ phone.sizeAndWeight.dimensions[2] }</dd>
                <dt>Weight</dt>
                <dd>${ phone.sizeAndWeight.weight }</dd>
              </dl>
            </li>
            <li>
              <span>Display</span>
              <dl>
                <dt>Screen size</dt>
                <dd>${ phone.display.screenSize }</dd>
                <dt>Screen resolution</dt>
                <dd>${ phone.display.screenResolution }</dd>
                <dt>Touch screen</dt>
                <dd>${ phone.display.touchScreen ? '✓' : '✘' }</dd>
              </dl>
            </li>
            <li>
              <span>Hardware</span>
              <dl>
                <dt>CPU</dt>
                <dd>${ phone.hardware.cpu }</dd>
                <dt>USB</dt>
                <dd>${ phone.hardware.usb }</dd>
                <dt>Audio / headphone jack</dt>
                <dd>${ phone.hardware.audioJack }</dd>
                <dt>FM Radio</dt>
                <dd>${ phone.display.fmRadio ? '✓' : '✘' }</dd>
                <dt>Accelerometer</dt>
                <dd>${ phone.display.physicalKeyboard ? '✓' : '✘' }</dd>
              </dl>
            </li>
            <li>
              <span>Camera</span>
              <dl>
                <dt>Primary</dt>
                <dd>${ phone.camera.primary }</dd>
                <dt>Features</dt>
                <dd>${ phone.camera.features }</dd>
              </dl>
            </li>
            <li>
              <span>Additional Features</span>
              <dd>${ phone.additionalFeatures }</dd>
            </li>
          </ul>
   
        </div>
        `
  }

  _onPhoneAdd(event) {
    let target = event.target.closest('[data-element="add-button"]');
    if (event.target !== target) return;

    let customEvent = new CustomEvent('phoneAdded', {
      detail: {phoneId: target.nextElementSibling.dataset.phoneId}
    });

    this._element.dispatchEvent(customEvent);
  }

  _onBackList(event) {
    let target = event.target.closest('[data-element="back-button"]');
    if (event.target !== target) return;

    let customEvent = new CustomEvent('back', {
      detail: {target: target}
    });

    this._element.dispatchEvent(customEvent);
  }

  _galleryClick(event) {
    if (!event.target.classList.contains("gallery__smallImage")) return;
    let bigImage = this._element.querySelector('.bigImage');
    let smallImage = event.target.closest('img');
    bigImage.src = smallImage.src;
  }
}


