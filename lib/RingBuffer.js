"use strict";

class RingBuffer {
  #view = null;
  #head = 0;
  #tail = 0;
  #size = 0;
  #length = 0;
  #dial = null;

  constructor(size) {
    this.#dial = (((size & (size - 1)) === 0) ? this.#bitwise :
      this.#reminder).bind(this);
    this.#size = size;
    this.#view = new Int32Array(
      new ArrayBuffer(size * Int32Array.BYTES_PER_ELEMENT)
    );
  }

  #bitwise(pointer) {
    return (pointer + 1) & (this.#size - 1);
  }

  #reminder(pointer) {
    return (pointer + 1) % this.#size;
  }

  enqueue(value) {
    if (this.isFull) return false;
    this.#view[this.#head] = value;
    this.#head = this.#dial(this.#head);
    this.#length++;
    return true;
  }

  dequeue() {
    if (this.isEmpty) return;
    const value = this.#view[this.#tail];
    this.#view[this.#tail] = 0;
    this.#tail = this.#dial(this.#tail);
    this.#length--;
    return value;
  }

  get isEmpty() {
    return this.#length === 0;
  }

  get isFull() {
    return this.#length === this.#size;
  }

  get size() {
    return this.#size;
  }

  get length() {
    return this.#length;
  }
}

module.exports = { RingBuffer };
