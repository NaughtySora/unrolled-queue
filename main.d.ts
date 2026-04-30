export class UnrolledQueue {
  constructor(size: number);
  enqueue(data: any): boolean;
  dequeue(): any;
  length: number;
  size: number;
}
