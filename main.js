"use strict";

const rNode = Symbol();

class RingBuffer {
  #tail = 0;
  #head = 0;
  #length = 0;
  #size = 0;
  #list = null;
  [rNode] = null;

  constructor(size) {
    this.#size = size;
    this.#list = new Array(size).fill(null);
  }

  enqueue(data) {
    const size = this.#size;
    if (this.#length === size) return false;
    const tail = this.#tail;
    this.#list[tail] = data;
    this.#tail = (tail + 1) % size;
    this.#length++;
    return true;
  }

  dequeue() {
    if (this.#length === 0) return null;
    const list = this.#list;
    const head = this.#head;
    const data = list[head];
    list[head] = null;
    this.#head = (head + 1) % this.#size;
    this.#length--;
    return data;
  }

  get length() {
    return this.#length;
  }
}

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
    const node = new RingBuffer(size);
    this.#head = node;
    this.#tail = node;
  }

  enqueue(data) {
    const head = this.#head;
    const added = head.enqueue(data);
    if (!added) {
      const node = new RingBuffer(this.#size);
      head[rNode] = node;
      this.#head = node;
      node.enqueue(data);
    }
    this.#length++;
  }

  dequeue() {
    if (this.#length === 0) return null;
    const tail = this.#tail;
    this.#length--;
    if (tail.length > 0) return tail.dequeue();
    return (this.#tail = tail[rNode]).dequeue();
  }

  get length() {
    return this.#length;
  }
}

module.exports = { UnrolledQueue, RingBuffer };
