import { EvalFunction, abs, floor, log, pow } from "mathjs";
import { RootOfEquation } from "./RootOfEquation";
import { Point } from "@/types";

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
  
  constructor(f: EvalFunction, xStart: number, xEnd: number, epsilon: number) {
    super(f, xStart, xEnd, epsilon);
  }

  private calcultateStep() {
    const step = log(this.xEnd - this.xStart, 10);
    if(step % 1 == 0) return Number(pow(10, step - 1));
    return Number(pow(10, floor(step)));
  }

  public solve(): GraphicalResult {
    const maxIter = 1000;
    const iterations: GraphicalIterData[] = [];
    const points: Point[] = [];
    const result: GraphicalResult = {};

    let step = this.calcultateStep();
    let iter = 0;
    let x = this.xStart;
    let temp = this.f.evaluate({ x });
    let y;
    let isSolveable = false;
    
    for(let i = this.xStart; i < this.xEnd; i++) {
      if(this.f.evaluate({ x: i}) * this.f.evaluate({ x: i+1}) < 0) isSolveable = true;
    }

    if(isSolveable) {
      while(iter < maxIter) {
        iter++;

        y = this.f.evaluate({ x });
        points.push({x , y});

        iterations.push({
          x, y, iter
        })

        if(abs(y) < this.epsilon) break;

        if(temp * y < 0) {
          x -= step;
          step /= 10;
          y = this.f.evaluate({ x });
        }

        if(x == this.xEnd) break;

        x += step;

        temp = y;
      }
      result.ans = { x, y, iter, iterations, points }
    } else {
      result.error = `Can't find root in range(${this.xStart}, ${this.xEnd})`
    }
    
    return result;
  }
}