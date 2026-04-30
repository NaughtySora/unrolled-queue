"use strict";

const assert = require("node:assert/strict");
const { it, describe } = require("node:test");
const { RingBuffer } = require("../lib/RingBuffer.js");
const { UnrolledQueue } = require("../lib/UnrolledQueue.js");
const { DLL } = require("../lib/DLL.js");

describe('DLL', () => {
  const list = new DLL();
  list.unshift(1);
  assert.equal(list.head, 1);
  assert.equal(list.tail, 1);
  list.unshift(2);
  assert.equal(list.head, 2);
  assert.equal(list.tail, 1);
  list.unshift(3);
  assert.equal(list.head, 3);
  assert.equal(list.tail, 1);
  assert.equal(list.pop(), 1);
  assert.equal(list.head, 3);
  assert.equal(list.tail, 2);
  assert.equal(list.pop(), 2);
  assert.equal(list.head, 3);
  assert.equal(list.tail, 3);
  list.unshift(4);
  assert.equal(list.head, 4);
  assert.equal(list.tail, 3);
  assert.equal(list.pop(), 3);
  assert.equal(list.head, 4);
  assert.equal(list.tail, 4);
  assert.equal(list.pop(), 4);
  assert.equal(list.head, undefined);
  assert.equal(list.tail, undefined);
  assert.equal(list.pop(), undefined);
});

describe("RingBuffer", () => {
  it('reminder', () => {
    const buffer = new RingBuffer(3);
    assert.equal(buffer.length, 0);
    assert.equal(buffer.size, 3);
    buffer.enqueue(1);
    buffer.enqueue(2);
    assert.equal(buffer.length, 2);
    buffer.enqueue(3);
    assert.equal(buffer.enqueue(4), false);
    assert.ok(buffer.isFull);
    assert.equal(buffer.dequeue(), 1);
    assert.equal(buffer.enqueue(4), true);
    assert.equal(buffer.dequeue(), 2);
    assert.equal(buffer.dequeue(), 3);
    assert.equal(buffer.dequeue(), 4);
    assert.equal(buffer.length, 0);
    assert.ok(buffer.isEmpty);
    assert.equal(buffer.dequeue(), undefined);
  });

  it('bitwise', () => {
    const buffer = new RingBuffer(8);
    assert.equal(buffer.length, 0);
    buffer.enqueue(1);
    buffer.enqueue(2);
    assert.equal(buffer.length, 2);
    assert.equal(buffer.size, 8);
    buffer.enqueue(3);
    buffer.enqueue(4);
    buffer.enqueue(5);
    buffer.enqueue(6);
    buffer.enqueue(7);
    buffer.enqueue(8);
    assert.equal(buffer.enqueue(9), false);
    assert.equal(buffer.dequeue(), 1);
    assert.equal(buffer.enqueue(9), true);
    assert.equal(buffer.dequeue(), 2);
    assert.equal(buffer.dequeue(), 3);
    assert.equal(buffer.dequeue(), 4);
    assert.equal(buffer.dequeue(), 5);
    assert.equal(buffer.dequeue(), 6);
    assert.equal(buffer.dequeue(), 7);
    assert.equal(buffer.dequeue(), 8);
    assert.equal(buffer.dequeue(), 9);
    assert.equal(buffer.length, 0);
    assert.equal(buffer.dequeue(), undefined);
  });
});

describe("UnrolledQueue", () => {
  it("init", () => {
    const expected = new RangeError("Size has to be greater than zero");
    assert.throws(() => new UnrolledQueue(), expected);
    assert.throws(() => new UnrolledQueue(0), expected);
    assert.throws(() => new UnrolledQueue(-1), expected);
  });

  it("enqueue/dequeue", () => {
    const queue = new UnrolledQueue(3);
    queue.enqueue(1);
    assert.equal(queue.length, 1);
    assert.equal(queue.dequeue(), 1);
    assert.equal(queue.dequeue(), undefined);
    queue.enqueue(2);
    queue.enqueue(3);
    assert.equal(queue.length, 2);
    assert.equal(queue.dequeue(), 2);
    assert.equal(queue.dequeue(), 3);
    assert.equal(queue.length, 0);
    assert.equal(queue.dequeue(), undefined);
  });

  it("forcing to use many buffers", () => {
    const COUNT = 512;
    const SIZE = 128;
    const queue = new UnrolledQueue(SIZE);
    for (let i = 0; i < COUNT; i++) queue.enqueue(i);
    assert.equal(queue.length, COUNT);
    assert.equal(queue.size, SIZE);
    const GET = 33;
    let i = 0;
    for (; i < GET; i++) {
      assert.equal(queue.dequeue(), i);
    }
    assert.equal(queue.length, COUNT - GET);
    const COUNT2 = 300;
    for (let i = 0; i < COUNT2; i++) queue.enqueue(i);
    assert.equal(queue.length, COUNT - GET + COUNT2);
    const GET2 = 10;
    for (let j = 0; j < GET2; j++) {
      assert.equal(queue.dequeue(), j + i);
    }
    assert.equal(queue.length, COUNT - GET - GET2 + COUNT2);
    while (queue.dequeue() !== undefined);
    assert.equal(queue.length, 0);
  });
});
