
export interface VectorType {
  x: number;
  y: number;
}

export class Vector implements VectorType {
  x: number;
  y: number;

  constructor(vector: VectorType = { x: 0, y: 0 }) {
    this.set(vector);
  }

  // istanbul ignore next
  toString(): string {
    return JSON.stringify({ x: this.x, y: this.y });
  }

  distance = (v1: Vector, v2: Vector = this): number => {
    const diffX = v1.x - v2.x;
    const diffY = v1.y - v2.y;
    return Math.sqrt(diffX ** 2 + diffY ** 2);
  }

  set = (vector: VectorType): void => {
    this.x = vector.x;
    this.y = vector.y;
  }

  add = (a: VectorType): Vector => {
    return new Vector({ x: this.x + a.x, y: this.y + a.y });
  }

  multiply = (n: number, b: VectorType = this): Vector => {
    return new Vector({ x: n * b.x, y: n * b.y });
  }

  center = (a: VectorType, b: VectorType = this): Vector => {
    return new Vector({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  }

  subtract = (a: VectorType): Vector => {
    return new Vector({ x: this.x - a.x, y: this.y - a.y });
  }
}

export class TouchPosition {
  offset: Vector;
  current: Vector;
  constructor({ offset = new Vector(), current = new Vector() }: {offset?: Vector, current?: Vector} = {}) {
    this.offset = offset;
    this.current = current;
  }

  setOffset = ({ x, y }: VectorType): void => {
    this.offset.x = x;
    this.offset.y = y;
  }

  setCurrent = ({ x, y }: VectorType): void => {
    this.current.x = x;
    this.current.y = y;
  }
}
