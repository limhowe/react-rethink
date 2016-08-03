import debug from 'debug';
import _ from 'lodash';

const logger = debug('rethink-chat subscriber');
const _defaultOptions = {
  limit: 10
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
    this.logger = debug('rethink-chat subscriber');

    // set options
    this.options = Object.assign({}, _defaultOptions, options);

    // put the socket in unique room so that event is emitted to only subscribed client
    this.socket = socket;

    // initialize data
    this.reset();

    // set default properties
    this.dataPool = [];
  }

  /**
   * intialize watching and fetching
   * @method reset
   */
  reset() {
    // watch the changes
    this.watch();

    // fetches initial data
    this.getData();
  }

  /**
   * pushes data to client side.
   * @method emit
   * @param Array<Object> data
   * @returns undefined
   */
  emit(data) {
    const objArray = this._validateChange(data);
    this.logger('emit %s', JSON.stringify(objArray));

    this.socket.emit(this.getEventName(), {
      action: 'change',
      data: objArray
    });
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

  // ========================================
  // Private methods
  // ========================================
  /**
   * check for the changes against id stored in dataPool
   * @method _validateChange
   * @private
   * @param Array<Object> dataArary
   * @returns Array<Object> filteredArray
   */
  _validateChange(objArray) {
    const filteredArray = _.filter(objArray,
      (obj) => (_.indexOf(this.dataPool, obj.id) === -1)
    );

    // updates dataPool
    filteredArray.forEach((obj) => {
      this.dataPool.push(obj.id);
    });

    return filteredArray;
  }
}
