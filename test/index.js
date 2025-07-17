"use strict";

const { it, describe } = require("node:test");
const assert = require("node:assert");
const { UnrolledQueue, RingBuffer } = require("../main");

it("RingBuffer", () => {

  describe("Adding to full list", () => {
    const buffer = new RingBuffer(3);
    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.enqueue(3);
    assert.strictEqual(buffer.enqueue(4), false);
  });

  describe("Getting elements", () => {
    const buffer = new RingBuffer(3);
    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.enqueue(3);
    assert.strictEqual(buffer.enqueue(4), false);
  });


  // const buffer2 = new RingBuffer(5);
  // buffer2.enqueue(1);
  // buffer2.enqueue(2);
  // buffer2.enqueue(3);
  // buffer2.enqueue(4);
  // buffer2.enqueue(5);
  // const data = buffer2.dequeue();
  // const added2 = buffer2.enqueue(6);
  // const data2 = buffer2.dequeue();
  // const data3 = buffer2.dequeue();
  // const added3 = buffer2.enqueue({ test: 2 });
  // console.log({ buffer2, added2, data, data2, data3, added3 })
});





const queue = new UnrolledQueue(3);
for (let i = 0; i < 441; i++) queue.enqueue(i);
for (let i = 0; i < 33; i++) queue.dequeue();
for (let i = 0; i < 300; i++) queue.enqueue(i);
for (let i = 0; i < 10; i++) console.log(queue.dequeue());
