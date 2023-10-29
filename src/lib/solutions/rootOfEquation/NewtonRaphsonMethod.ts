import { EvalFunction, abs, compile, derivative } from "mathjs";
import RootOfEquation from "./RootOfEquation";
import { Point } from "@/types";

export interface NewtonRaphsonInput {
  fx: string
  x0: number
  epsilon: number
}

interface NewtonRaphsonIterData {
  xOld: number
  xNew: number
  fx: number
  fPrimeX: number
  iter: number
  tolerance: number
}

export interface NewtonRaphsonResult {
  ans?: {
    x: number
    y: number
    iter: number
    iterations: NewtonRaphsonIterData[]
    points: Point[]
    fPrime: string
  }
  error?: string
}

export default class NewtonRaphsonMethod extends RootOfEquation {
  
  private x0: number;

  public constructor(fx: string, x0: number, epsilon: number) {
    super(fx, epsilon);
    this.x0 = x0;
  }

  public solve(): NewtonRaphsonResult {
    const f = compile(this.fx);
    const fPrime = derivative(this.fx, "x");
    const result: NewtonRaphsonResult = {};
    const iterations: NewtonRaphsonIterData[] = [];

    let x = this.x0;
    let xNew: number;

    do {
      this.iter++;
      if(fPrime.evaluate({x}) === 0) {
        result.error = `f'(${x}) = 0 can't divided by 0`;
        break;
      }

      xNew = x - (f.evaluate({x: x}) / fPrime.evaluate({x: x}))
      this.tolerance = abs((xNew - x) / xNew) * 100;

      this.points.push({x, y: f.evaluate({x})});
      iterations.push({
        xNew, xOld: x, iter: this.iter, tolerance: this.tolerance, fx: f.evaluate({x: x}), fPrimeX: fPrime.evaluate({x: x})
      })

      x = xNew;

      if(this.iter > this.maxIter) {
        result.error = `Max iteration at iteration: ${this.iter-1}`
        break;
      }

    } while (this.tolerance > this.epsilon);

    result.ans = { x, y: f.evaluate({x}), iter: this.iter, iterations, fPrime: fPrime.toString(), points: this.points }
    
    return result;
  }
}