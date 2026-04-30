'use strict';

class DLL {
  #head = null;
  #tail = null;

  unshift(value) {
    const node = { value, next: null, prev: null };
    if (this.#head === null) return void (this.#tail = this.#head = node);
    const head = this.#head;
    node.next = head;
    this.#head = head.prev = node;
    return node;
  }

  pop() {
    if (this.#head === null) return;
    const tail = this.#tail;
    this.#tail = tail.prev;
    if (this.#tail === null) this.#head = null;
    else this.#tail.next = null;
    tail.next = tail.prev = null;
    return tail.value;
  }

  get head() {
    if (this.#head === null) return;
    return this.#head.value;
  }

  get tail() {
    if (this.#tail === null) return;
    return this.#tail.value;
  }
}

module.exports = { DLL };
