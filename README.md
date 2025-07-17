# UnrolledQueue

## Types

`class RingBuffer {`\
`  constructor(size: number);`\
`  length: number;`\
`  enqueue(data: any): boolean;`\
`  dequeue(): any;`\
`}`

`class UnrolledQueue {`\
`  constructor(size: number);`\
`  length: number;`\
`  enqueue(data: any): boolean;`\
`  dequeue(): any;`\
`}`


## Example

```js
  const BUFFER_SIZE = 2048;
  const queue = new UnrolledQueue(BUFFER_SIZE);
  queue.enqueue({ test: 42 });
  queue.enqueue({ test: 1337, name: "John Doe" });
  queue.enqueue({ name: "value"});
  // { name: "value"} -> { test: 1337, name: "John Doe" } -> { test: 42 }

  const data = queue.dequeue(); // { test: 42 }
  const data = queue.dequeue(); // { test: 1337, name: "John Doe" }
  queue.enqueue({ test: 2025 });
  // { test: 2025 } -> { name: "value"}

  const data = queue.dequeue(); // { name: "value"}
  // { test: 2025 }
```
