'use strict';

const { RingBuffer } = require('./RingBuffer.js');
const { DLL } = require('../lib/DLL.js');

class UnrolledQueue {
  #length = 0;
  #size = 0;
  #list = new DLL();

  constructor(size) {
    if (typeof size !== "number" || size <= 0) {
      throw new RangeError("Size has to be greater than zero");
    }
    this.#size = size;
    this.#list.unshift(new RingBuffer(size));
  }

  enqueue(data) {
    const list = this.#list;
    if (!list.head.enqueue(data)) {
      const buffer = new RingBuffer(this.#size);
      list.unshift(buffer);
      buffer.enqueue(data);
    }
    this.#length++;
  }

  dequeue() {
    if (this.#length === 0) return;
    const list = this.#list;
    this.#length--;
    if (list.tail.length > 0) return list.tail.dequeue();
    else return (list.pop(), list.tail).dequeue();
  }

  get length() {
    return this.#length;
  }

  get size() {
    return this.#size;
  }
}

module.exports = { UnrolledQueue };