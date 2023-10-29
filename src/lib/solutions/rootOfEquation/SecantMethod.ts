import { abs, compile } from "mathjs";
import RootOfEquation from "./RootOfEquation";
import { Point } from "@/types";

export interface SecantInput {
  fx: string
  x0: number
  x1: number
  epsilon: number
}

interface SecantIterData {
  xi: number
  x0: number
  x1: number
  fx0: number
  fx1: number
  fxi: number
  iter: number
  tolerance: number
}

export interface SecantResult {
  ans?: {
    xi: number
    fxi: number
    iter: number
    iterations: SecantIterData[]
    points: Point[]
  }
  error?: string
}

export default class SecantMethod extends RootOfEquation {
  
  private x0: number;
  private x1: number;

  constructor(fx: string, x0: number, x1: number, epsilon: number) {
    super(fx, epsilon);
    this.x0 = x0;
    this.x1 = x1;
  }
  
  public solve(): SecantResult {
    const f = compile(this.fx);
    const result: SecantResult = {};
    const iterations: SecantIterData[] = [];

    let x0 = this.x0;
    let x1 = this.x1;
    let xi: number, fxi: number, fx0: number, fx1: number;

    do {
      this.iter++;

      xi = x0 - ((f.evaluate({x: x0}) * (x0 - x1)) / (f.evaluate({x: x0}) - f.evaluate({x: x1})))
      this.tolerance = abs(xi - x1);
      fx0 = f.evaluate({x: x0});
      fx1 = f.evaluate({x: x1});
      fxi = f.evaluate({x: xi});

      this.points.push({x: xi, y: fxi})
      iterations.push({
        xi, x1, x0, iter: this.iter, tolerance: this.tolerance, fx0 ,fx1, fxi
      })

      x0 = x1;
      x1 = xi;

      if(this.iter > this.maxIter) {
        result.error = `Max iteration at iteration: ${this.iter-1}`
        return result;
      }
      
    } while(this.tolerance > this.epsilon)

    result.ans = { xi, fxi: f.evaluate({x: xi}), iter: this.iter, iterations, points: this.points }
    
    return result;
  }
}