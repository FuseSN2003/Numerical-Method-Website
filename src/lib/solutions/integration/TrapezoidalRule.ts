import { abs, compile } from "mathjs";
import Integration from "./Integration";

export interface SingleTrapezoidalResult {
  ans?: {
    approxI: number
    trueIntegral: number
    a: number
    b: number
    fxa: number
    fxb: number
    tolerance: number
    fx: string
    integral: string;
  };
  error?: string;
}

export interface CompositeTrapezoidalResult {
  ans?: {
    approxI: number
    trueIntegral: number
    a: number
    b: number
    h: number
    n: number
    tolerance: number
    fx: string
    integral: string
  };
  error?: string;
}

export default class TrapezoidalRule extends Integration {
  public constructor(fx: string, a: number, b: number) {
    super(fx, a, b);
  }

  public single(): SingleTrapezoidalResult {
    const f = compile(this.fx);
    const result: SingleTrapezoidalResult = {};

    this.h = this.b - this.a;

    const fxa = f.evaluate({ x: this.a });
    const fxb = f.evaluate({ x: this.b });

    const I = (this.h / 2) * (fxb - fxa);

    this.tolerance = abs((this.trueIntegral - I) / this.trueIntegral) * 100;

    result.ans = {
      approxI: I,
      trueIntegral: this.trueIntegral,
      tolerance: this.tolerance,
      a: this.a,
      b: this.b,
      fxa,
      fxb,
      integral: this.integralfx,
      fx: this.fx,
    };

    return result;
  }

  public composite(n: number): CompositeTrapezoidalResult {
    const f = compile(this.fx);
    const result: CompositeTrapezoidalResult = {};

    this.h = (this.b - this.a) / n;

    let sum = 0.5 * (f.evaluate({ x: this.a }) + f.evaluate({ x: this.b }));

    for (let i = 1; i < n; i++) {
      sum += f.evaluate({ x: this.a + i * this.h });
    }

    const approxI = this.h * sum;

    this.tolerance = abs((this.trueIntegral - approxI) / this.trueIntegral) * 100;

    result.ans = {
      approxI,
      trueIntegral: this.trueIntegral,
      tolerance: this.tolerance,
      a: this.a,
      b: this.b,
      h: this.h,
      n,
      integral: this.integralfx,
      fx: this.fx,
    };

    return result;
  }
}
