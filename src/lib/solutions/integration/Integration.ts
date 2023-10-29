import { EvalFunction, compile } from 'mathjs';
import { integrate } from 'nerdamer';
import 'nerdamer/Calculus';

export interface SingleIntegrationForm {
  fx: string
  a: number
  b: number
}

export interface CompositeIntegrationForm {
  fx: string
  a: number
  b: number
  n: number
}

export default abstract class Integration {
  protected fx: string;
  protected integralfx: string;
  protected trueIntegral: number;
  protected integral: EvalFunction;
  protected a: number;
  protected b: number;
  protected n = 0;
  protected h = 0;
  protected tolerance = 0;

  public constructor(fx: string, a: number, b: number) {
    this.fx = fx;
    this.a = a;
    this.b = b;
    this.integralfx = integrate(fx, "x").toString();
    this.integral = compile(this.integralfx);
    this.trueIntegral = this.integral.evaluate({x: b}) - this.integral.evaluate({x: a});
  }

  abstract single(): any;

  abstract composite(n: number): any;
}