# UnrolledQueue

```js
  const BUFFER_SIZE = 2048;
  const queue = new UnrolledQueue(BUFFER_SIZE);
  queue.enqueue({ test: 42 });
  queue.enqueue({ test: 1337, name: "John Doe" });
  queue.enqueue({ name: "value"});
  const data = queue.dequeue();
  const data = queue.dequeue(); 
  queue.enqueue({ test: 2025 });
  const data = queue.dequeue();
```
