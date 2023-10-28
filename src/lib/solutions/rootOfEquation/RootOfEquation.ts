import { Point } from "@/types";
import { EvalFunction } from "mathjs";

export default abstract class RootOfEquation {
  protected fx: string;
  protected xStart: number;
  protected xEnd: number;
  protected epsilon: number;
  protected iter = 0;
  protected points: Point[] = [];
  protected pointsCal: Point[] = [];

  constructor(fx: string, xStart: number, xEnd: number, epsilon: number) {
    this.fx = fx;
    this.xStart = xStart;
    this.xEnd = xEnd;
    this.epsilon = epsilon;
  }

  public abstract solve(): any;
}