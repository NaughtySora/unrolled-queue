'use strict';

const RingBuffer = require('./RingBuffer.js');

class UnrolledQueue {
  #length = 0;
  #size = 0;
  #head = null;
  #tail = null;

  constructor(size) {
    if ((size | 0) <= 0) {
      throw new RangeError("Buffer size has to be greater than zero");
    }
    this.#size = size;
    this.#tail = this.#head = new RingBuffer(size);
  }

  enqueue(data) {
    const head = this.#head;
    const added = head.enqueue(data);
    if (!added) {
      const node = new RingBuffer(this.#size);
      this.#head = head[rNode] = node;
      node.enqueue(data);
    }
    this.#length++;
  }

  dequeue() {
    if (this.#length === 0) return;
    const tail = this.#tail;
    this.#length--;
    if (tail.length > 0) return tail.dequeue();
    return (this.#tail = tail[rNode]).dequeue();
  }

  get length() {
    return this.#length;
  }
}

module.exports = { UnrolledQueue };