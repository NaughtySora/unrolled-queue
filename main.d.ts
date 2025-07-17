
export class RingBuffer {
  constructor(size: number);
  length: number;
  enqueue(data: any): boolean;
  dequeue(): any;
}

export class UnrolledQueue {
  constructor(size: number);
  length: number;
  enqueue(data: any): boolean;
  dequeue(): any;
}
