"use strict";

const assert = require("node:assert/strict");
const { it, describe } = require("node:test");
const { RingBuffer } = require("../lib/RingBuffer.js");
const { UnrolledQueue } = require("../lib/UnrolledQueue.js");


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

// describe.skip("UnrolledQueue", () => {
//   it("Initialization", () => {
//     const expected = new RangeError("Buffer size has to be greater than zero");
//     assert.throws(() => new UnrolledQueue(), expected);
//     assert.throws(() => new UnrolledQueue(0), expected);
//     assert.throws(() => new UnrolledQueue(0.22), expected);
//     assert.throws(() => new UnrolledQueue(-1), expected);
//     assert.throws(() => new UnrolledQueue({}), expected);
//   });

//   it("Adding elements", () => {
//     const queue = new UnrolledQueue(3);
//     queue.enqueue(1);
//     queue.enqueue(null);
//     queue.enqueue();
//     queue.enqueue({ test: 42 });
//     queue.enqueue([]);
//     queue.enqueue(new Map([[1, 2]]));
//   });

//   it("Getting elements", () => {
//     const queue = new UnrolledQueue(3);
//     queue.enqueue(1);
//     assert.strictEqual(queue.length, 1);
//     assert.strictEqual(queue.dequeue(), 1);
//     assert.strictEqual(queue.dequeue(), null);
//     queue.enqueue(2);
//     queue.enqueue(3);
//     assert.strictEqual(queue.length, 2);
//     assert.strictEqual(queue.dequeue(), 2);
//     assert.strictEqual(queue.dequeue(), 3);
//     assert.strictEqual(queue.length, 0);
//     assert.strictEqual(queue.dequeue(), null);
//     const array = [1, 42, "test", new Map(), () => { }];
//     queue.enqueue(array);
//     assert.strictEqual(queue.length, 1);
//     assert.strictEqual(queue.dequeue(), array);
//   });

//   it("Queue many elements, order", () => {
//     const queue = new UnrolledQueue(2048);
//     const add = 441;
//     for (let i = 0; i < add; i++) queue.enqueue(i);
//     assert.strictEqual(queue.length, add);
//     let i = 0;
//     const get = 33;
//     for (; i < get; i++) {
//       assert.strictEqual(queue.dequeue(), i);
//     }
//     assert.strictEqual(queue.length, add - get);
//     const additional = 300;
//     for (let i = 0; i < additional; i++) queue.enqueue(i);
//     assert.strictEqual(queue.length, add - get + additional);
//     const get2 = 10;
//     for (let j = 0; j < get2; j++) {
//       assert.strictEqual(queue.dequeue(), j + i);
//     }
//     assert.strictEqual(queue.length, add - get + additional - get2);
//   });
// });
