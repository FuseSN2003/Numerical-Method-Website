import { abs, compile } from "mathjs";
import RootOfEquation from "./RootOfEquation";
import { Point } from "@/types";

export interface BisectionInput {
  fx: string
  xl: number
  xr: number
  epsilon: number
}

interface BisectionIterData {
  xl: number
  xr: number
  xm: number
  xmOld: number
  fxm: number
  iter: number
  tolerance: number
}

export interface BisectionResult {
  ans?: {
    xm: number
    fxm: number
    iter: number
    iterations: BisectionIterData[]
    points: Point[]
  }
  error?: string
}

export default class BisectionMethod extends RootOfEquation {
  private xStart: number;
  private xEnd: number;

  public constructor(fx: string, xStart: number, xEnd: number, epsilon: number) {
    super(fx, epsilon);
    this.xStart = xStart;
    this.xEnd = xEnd;
  }

  public solve(): BisectionResult {
    const f = compile(this.fx)
    const result: BisectionResult = {};
    const iterations: BisectionIterData[] = [];

    let xl = this.xStart;
    let xr = this.xEnd;
    let xm = 0;
    let fxm: number, xmOld;

    if(f.evaluate({x: xl}) * f.evaluate({x: xr}) > 0) {
      result.error = "Bisection method may not converge as f(xl) and f(xr) have the same sign.";
      return result;
    }

    do {
      this.iter++;
      xmOld = xm;

      xm = (xl + xr) / 2;
      fxm = f.evaluate({x: xm});
      this.tolerance = abs((xm - xmOld) / xm) * 100;

      this.points.push({x: xm, y: fxm});
      iterations.push({
        xl, xr, xm, iter: this.iter, tolerance: this.tolerance, xmOld, fxm
      })
      
      if(f.evaluate({x: xm}) * f.evaluate({x: xr}) > 0) {
        xr = xm;
      } else {
        xl = xm;
      }

      if(this.iter > this.maxIter) {
        result.error = `Max iteration at iteration: ${this.iter-1}`
        return result;
      }

    } while (this.tolerance > this.epsilon)

    result.ans = { xm, fxm, iter: this.iter, iterations, points: this.points }

    return result;
  }
}