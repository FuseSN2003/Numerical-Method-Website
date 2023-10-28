import { Point } from "@/types";
import RootOfEquation from "./RootOfEquation";
import { abs, compile } from "mathjs";

export interface OnePointInput {
  fx: string
  x0: number
  epsilon: number
}

interface OnePointIterData {
  x: number
  xOld: number
  iter: number
  tolerance: number
}

export interface OnePointResult {
  ans?: {
    x: number
    xOld: number
    iter: number
    iterations: OnePointIterData[]
    points: Point[]
    calPoints: Point[]
  }
  error?: string
}

export default class OnePointIterationMethod extends RootOfEquation {
  private x0: number;

  constructor(fx: string, x0: number, epsilon: number) {
    super(fx, epsilon);
    this.x0 = x0;
  }

  public solve(): OnePointResult {
    const f = compile(this.fx);
    const result: OnePointResult = {};
    const iterations: OnePointIterData[] = [];
    
    let x = this.x0;
    let xOld: number;

    do {
      this.iter++;
      xOld = x;

      x = f.evaluate({x});

      this.calPoints.push({x: xOld, y: x});
      
      this.tolerance = abs((x - xOld) / x) * 100;

      if(abs(x) === null || isNaN(x) || x === Infinity) {
        result.error = "The iteration diverged!"
        return result;
      }

      iterations.push({
        x, xOld, iter: this.iter, tolerance: this.tolerance
      })

    } while (this.tolerance > this.epsilon);

    this.points.push({x: this.x0, y: this.x0})
    this.points.push({x: x, y: x})

    result.ans = { x, xOld, iter: this.iter, iterations, points: this.points, calPoints: this.calPoints }

    return result;
  }
}