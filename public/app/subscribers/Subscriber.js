import _ from 'lodash';
import socket from '../Socket';
import { autobind } from 'core-decorators';

// @TODO: change itemsArray into model
export default class Subscriber {
  options;
  itemsArray;

  constructor (options, handler = () => {}) {
    this.setOptions(options);
    this.setHandler(handler);
    this.itemsArray = [];
    this.subscribe();
  }

  setOptions(options) {
    this.options = Object.assign({}, options, this.options);
  }

  setHandler(handler) {
    this.handler = handler;
  }

  @autobind
  _handleReceivedData(response) {
    // action
    // data
    const {
      action,
      data
    } = response;
    switch (action) {
      case 'get':
        this.itemsArray = data;
        break;
      case 'update':
        data.forEach((d) => {
          const el = _.find(this.itemsArray, { id: d.id });
          Object.assign(el, d);
        });
        break;
      case 'insert':
        this.itemsArray.push(...data);
        break;
      case 'delete':
        data.forEach((d) => {
          const index = _.findIndex(this.itemsArray, { id: d.id });
          this.itemsArray.splice(index, 1);
        });
        break;
      default:
        break;
    }

    this.handler(this.itemsArray);
  }

  subscribe() {
    socket.on(this.getSubscriberName(), this._handleReceivedData);
    socket.emit('subscribe', {
      subscriberName: this.getSubscriberName(),
      options: this.options
    });
  }
}
