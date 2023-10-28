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
    pointsCal: Point[]
  }
  error?: string
}

export default class BisectionMethod extends RootOfEquation {

  constructor(fx: string, xStart: number, xEnd: number, epsilon: number) {
    super(fx, xStart, xEnd, epsilon);
  }

  public solve(): BisectionResult {
    const iterations: BisectionIterData[] = [];
    const result: BisectionResult = {};
    const f = compile(this.fx)

    let xl = this.xStart;
    let xr = this.xEnd;
    let xm = 0, tolerance = 0;
    let fxm: number, xmOld;

    if(f.evaluate({x: xl}) * f.evaluate({x: xr}) > 0) {
      result.error = "Bisection method may not converge as f(xl) and f(xr) have the same sign.";
      return result;
    }

    const step = (xr - xl) / 100;
    
    for(let i = xl; i <= xr; i+=step) {
      this.points.push({x: i, y: f.evaluate({x: i})})
    }

    do {
      this.iter++;
      xmOld = xm;

      xm = (xl + xr) / 2;
      fxm = f.evaluate({x: xm});
      tolerance = abs((xm - xmOld) / xm) * 100;

      this.pointsCal.push({x: xm, y: fxm});
      iterations.push({
        xl, xr, xm, iter: this.iter, tolerance, xmOld, fxm
      })
      
      if(f.evaluate({x: xm}) * f.evaluate({x: xr}) > 0) {
        xr = xm;
      } else {
        xl = xm;
      }
    } while (tolerance > this.epsilon)

    result.ans = {xm, fxm, iter: this.iter, iterations, points: this.points, pointsCal: this.pointsCal}

    return result;
  }
}