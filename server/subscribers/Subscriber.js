import debug from 'debug';
import _ from 'lodash';

const logger = debug('rethink-chat subscriber');
const _defaultOptions = {
  limit: 10 // to be used to set certain amount of resources to return
};

export default class Subscriber {
  // ======================================
  // Public methods
  // ======================================
  /**
   * @method constructor
   * @param {?Object} options
   * @param {socket.io} io
   */
  constructor(options, socket) {
    this.logger = debug(`rethink-chat ${this.getEventName()}`);

    // set options
    this.options = Object.assign({}, _defaultOptions, options);

    // put the socket in unique room so that event is emitted to only subscribed client
    this.socket = socket;

    // initialize data
    this.reset();
  }

  /**
   * intialize watching and fetching
   * @method reset
   */
  reset() {
    // watch the changes
    this.watch();

    // retrieve initial data
    this.getData();
  }

  /**
   * pushes data to client side.
   * @method emit
   * @param Array<Object> data
   * @returns undefined
   */
  emit(data, action = 'get') {
    // @TODO handle data deletion and update on validate change
    // const objArray = this._validateChange(data);

    const objArray = data;
    this.logger('emit %s', JSON.stringify(objArray));

    this.socket.emit(this.getEventName(), {
      action, // get, inserted, updated, deleted
      data: objArray
    });
  }

  /**
   * closes change feed watching the resource
   * @method close
   */
  close() {
    if (!this.feeds) {
      this.logger('No feed to close!')
      return;
    }

    this.feeds.close();
    this.feeds = null;
  }

  // ========================================
  // abstract methods
  // ========================================
  /**
   * @method watch
   * @returns Promise
   */
  watch() {
    this.logger('watch should be overridden');
  }

  /**
   * retrieves data by using complicated rethink queries. upon retrieval, it calls emits
   * @method getData
   * @returns undefined
   */
  getData() {
    this.logger('getData should be overridden');
  }

  /**
   * @method getEventName
   * @returns {string}
   */
  getEventName() {
    this.logger('subscriber name should be overridden');
  }
}
