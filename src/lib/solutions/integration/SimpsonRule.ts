import { compile } from "mathjs";
import Integration from "./Integration";

export interface SingleSimpsonResult {
  ans?: {
    approxI: number
    trueIntegral: number
    a: number
    b: number
    x1: number
    h: number
    fxa: number
    fxb: number
    fx1: number
    tolerance: number
    fx: string
    integral: string;
  }
  error?: string
}

export interface CompositeSimpsonResult {
  ans?: {
    approxI: number
    trueIntegral: number
    a: number
    b: number
    n: number
    h: number
    fxa: number
    fxb: number
    tolerance: number
    integral: string
  }
  error?: string
}

export default class SimpsonRule extends Integration {
  constructor(fx: string, a: number, b: number) {
    super(fx, a, b)
  }

  public single(): SingleSimpsonResult {
    const f = compile(this.fx);
    const result: SingleSimpsonResult = {}

    this.h = (this.b - this.a) / 2;

    const x1 = this.a + this.h;
    const fxa = f.evaluate({x: this.a});
    const fx1 = 4*f.evaluate({x: x1})
    const fxb = f.evaluate({x: this.a+2*this.h})

    const approxI = (this.h / 3) * (fxa + fx1 + fxb)

    result.ans = {
      approxI,
      trueIntegral: this.trueIntegral,
      tolerance: this.getTolerance(approxI),
      a: this.a,
      b: this.b,
      x1,
      fxa,
      fxb,
      fx1,
      h: this.h,
      integral: this.integralfx,
      fx: this.fx,
    }
    
    return result;
  }
  
  public composite(n: number) {
    const f = compile(this.fx);
    const result: CompositeSimpsonResult = {}
    
    this.h = (this.b - this.a) / (2 * n);
    
    const fxa = f.evaluate({x: this.a})
    const fxb = f.evaluate({x: this.b})
    let approxI =  fxa + fxb;
    
    for(let i = 1; i < 2*n; i++) {
      const x = this.a + i * this.h;
      approxI += (i % 2 === 0 ? 2 : 4) * f.evaluate({x})
    }

    approxI *= this.h / 3;

    result.ans = {
      approxI,
      trueIntegral: this.trueIntegral,
      a: this.a,
      b: this.b,
      n,
      fxa,
      fxb,
      h: this.h,
      tolerance: this.getTolerance(approxI),
      integral: this.integralfx,
    }

    return result;
  }
}