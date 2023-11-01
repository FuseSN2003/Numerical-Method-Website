import { Point } from "@/types";

export default abstract class RootOfEquation {
  protected fx: string;
  protected epsilon: number;
  protected iter = 0;
  protected points: Point[] = [];
  protected tolerance = 0;
  protected maxIter = 1000;

  public constructor(fx: string, epsilon: number) {
    this.fx = fx;
    this.epsilon = epsilon;
  }

  public abstract solve(): any;
}