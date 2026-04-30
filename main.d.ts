export class UnrolledQueue {
  constructor(size: number);
  length: number;
  enqueue(data: any): boolean;
  dequeue(): any;
}
