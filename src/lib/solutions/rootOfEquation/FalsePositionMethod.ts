import { abs, compile } from "mathjs";
import RootOfEquation from "./RootOfEquation";
import { Point } from "@/types";

export interface FalsePositionInput {
  fx: string
  xl: number
  xr: number
  epsilon: number
}

interface FalsePositionIterData {
  xl: number
  xr: number
  x: number
  fx: number
  xOld: number
  iter: number
  tolerance: number
}

export interface FalsePositionResult {
  ans?: {
    x: number
    fx: number
    iter: number
    iterations: FalsePositionIterData[]
    points: Point[]
  }
  error?: string
}

export default class FalsePositionMethod extends RootOfEquation {
  private xStart: number;
  private xEnd: number;

  public constructor(fx: string, xStart: number, xEnd: number, epsilon: number) {
    super(fx, epsilon);
    this.xStart = xStart;
    this.xEnd = xEnd;
  }

  public solve(): FalsePositionResult {
    const f = compile(this.fx);
    const result: FalsePositionResult = {}
    const iterations: FalsePositionIterData[] = [];

    let xl = this.xStart;
    let xr = this.xEnd;
    let x = 0;
    let fx: number, xOld;

    if(f.evaluate({x: xl}) * f.evaluate({x: xr}) >= 0) {
      result.error = "False Position method may not converge as f(xl) and f(xr) have the same sign."
      return result;
    }

    do {
      this.iter++;
      xOld = x;
      x = (((xl * f.evaluate({x: xr})) - (xr * f.evaluate({x: xl}))) / (f.evaluate({x: xr}) - f.evaluate({x: xl})))
      fx = f.evaluate({x})

      this.tolerance = abs((x - xOld) / x) * 100;

      this.points.push({x, y:fx});
      iterations.push({
        xl, xr, x, iter: this.iter, tolerance: this.tolerance, xOld, fx
      })

      if(f.evaluate({x}) * f.evaluate({x: xr}) > 0) {
        xr = x;
      } else {
        xl = x;
      }

      if(this.iter > this.maxIter) {
        result.error = `Max iteration at iteration: ${this.iter-1}`
        return result;
      }

    } while(this.tolerance > this.epsilon)

    result.ans = { x, fx: f.evaluate({x}), iter: this.iter, iterations, points: this.points }

    return result;
  }
}