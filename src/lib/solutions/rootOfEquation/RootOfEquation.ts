import { EvalFunction } from "mathjs";

export abstract class RootOfEquation {
  protected f: EvalFunction;
  protected xStart: number;
  protected xEnd: number;
  protected epsilon: number;

  constructor(f: EvalFunction, xStart: number, xEnd: number, epsilon: number) {
    this.f = f;
    this.xStart = xStart;
    this.xEnd = xEnd;
    this.epsilon = epsilon;
  }

  public abstract solve(): any;
}