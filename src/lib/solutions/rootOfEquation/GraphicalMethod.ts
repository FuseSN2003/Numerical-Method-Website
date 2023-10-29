import { abs, compile, floor, log, pow } from "mathjs";
import { Point } from "@/types";
import RootOfEquation from "./RootOfEquation";

export interface GraphicalInput {
  fx: string
  xStart: number
  xEnd: number
  epsilon: number
}

interface GraphicalIterData {
  x: number
  y: number
  iter: number
}

export interface GraphicalResult {
  ans?: {
    x: number
    y: number
    iter: number
    points: Point[]
    iterations: GraphicalIterData[]
  }
  error?: string
}

export default class GraphicalMethod extends RootOfEquation {
  
  private xStart: number;
  private xEnd: number;

  public constructor(fx: string, xStart: number, xEnd: number, epsilon: number) {
    super(fx, epsilon);
    this.xStart = xStart;
    this.xEnd = xEnd;
  }

  private calcultateStep() {
    const step = log(this.xEnd - this.xStart, 10);
    if(step % 1 == 0) return Number(pow(10, step - 1));
    return Number(pow(10, floor(step)));
  }

  public solve(): GraphicalResult {
    const f = compile(this.fx);
    const iterations: GraphicalIterData[] = [];
    const result: GraphicalResult = {};

    let step = this.calcultateStep();
    let x = this.xStart;
    let temp = f.evaluate({ x });
    let y;
    let isSolveable = false;
    
    for(let i = this.xStart; i < this.xEnd; i++) {
      if(f.evaluate({ x: i}) * f.evaluate({ x: i+1}) < 0) isSolveable = true;
    }

    if(isSolveable) {
      while(true) {
        this.iter++;

        y = f.evaluate({ x });

        this.points.push({x , y});
        iterations.push({
          x, y, iter: this.iter
        })

        if(abs(y) < this.epsilon) break;

        if(temp * y < 0) {
          x -= step;
          step /= 10;
          y = f.evaluate({ x });
        }

        if(x == this.xEnd) break;

        x += step;

        temp = y;

        if(this.iter > this.maxIter) {
          result.error = `Max iteration at iteration: ${this.iter-1}`
          return result;
        }
      }
      result.ans = { x, y, iter: this.iter, iterations, points: this.points }
    } else {
      result.error = `Can't find root in range(${this.xStart}, ${this.xEnd})`
    }
    
    return result;
  }
}