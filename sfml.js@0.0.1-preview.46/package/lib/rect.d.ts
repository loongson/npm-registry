import { PointType, Vector2F, Vector2I } from './vector2';

declare class Rect<Vector_T> {
  constructor(left: number, top: number, width: number, height: number);
  constructor(position: PointType<Vector2I>, size: PointType<Vector2I>);

  contains(x: number, y: number): boolean;
  contains(point: PointType<Vector_T>): boolean;
  intersects(rect: Rect<Vector_T>): false | Rect<Vector_T>;

  left: number;
  top: number;
  width: number;
  height: number;
}

export class IntRect extends Rect<Vector2I> {}
export class FloatRect extends Rect<Vector2F> {}
