import { EvalFunction, abs, compile, derivative } from "mathjs";

export interface DiffResult {
  ans?: {
    result: number
    h: number
    x: number
    fx: number[]
    order: number
    errorValue: number
    exactValue: number
    error: string
    exacDiff: string
    direction: string
  }
  error?: string
}

export default class Differentiation {
  private fx: string;
  private f: EvalFunction;
  private order: number;
  private direction: string;
  private error: string;
  private h: number;
  private x: number;

  constructor(fx: string, order: number, direction: string, error: string, h: number, x: number ) {
    this.fx = fx;
    this.f = compile(fx)
    this.order = order;
    this.direction = direction;
    this.error = error;
    this.h = h;
    this.x = x;
  }

  private calErrorVal(exactValue: number, approx: number): number {
    return abs((exactValue - approx) / exactValue) * 100
  }

  private calFunc(min: number, max: number): number[] {
    const fx: number[] = [];
    for(let i = min; i <= max; i++) {
      fx.push(this.f.evaluate({x: this.x+i*this.h}))
    }

    return fx;
  }

  public solve() {
    switch(this.order) {
      case 1: {
        if(this.error == "h" && this.direction == "forward") {
          return this.firstForwardh();
        }
        if(this.error == "h" && this.direction == "backward") {
          return this.firstBackwardh();
        }
        if(this.error == "h^2" && this.direction == "central") {
          return this.firstCentralh2();
        }
        if(this.error == "h^2" && this.direction == "forward") {
          return this.firstForwardh2();
        }
        if(this.error == "h^2" && this.direction == "backward") {
          return this.firstBackwardh2();
        }
        if(this.error == "h^4" && this.direction == "central") {
          return this.firstCentralh4();
        }
      }
      case 2: {
        if(this.error == "h" && this.direction == "forward") {
          return this.secondForwardh();
        }
        if(this.error == "h" && this.direction == "backward") {
          return this.secondBackwardh();
        }
        if(this.error == "h^2" && this.direction == "central") {
          return this.secondCentralh2();
        }
        if(this.error == "h^2" && this.direction == "forward") {
          return this.secondForwardh2();
        }
        if(this.error == "h^2" && this.direction == "backward") {
          return this.secondBackwardh2();
        }
        if(this.error == "h^4" && this.direction == "central") {
          return this.secondCentralh4();
        }
      }
      case 3: {
        if(this.error == "h" && this.direction == "forward") {
          return this.thirdForwardh();
        }
        if(this.error == "h" && this.direction == "backward") {
          return this.thirdBackwardh();
        }
        if(this.error == "h^2" && this.direction == "central") {
          return this.thirdCentralh2();
        }
        if(this.error == "h^2" && this.direction == "forward") {
          return this.thirdForwardh2();
        }
        if(this.error == "h^2" && this.direction == "backward") {
          return this.thirdBackwardh2();
        }
        if(this.error == "h^4" && this.direction == "central") {
          return this.thirdCentralh4();
        }
      }
      case 4: {
        if(this.error == "h" && this.direction == "forward") {
          return this.forthForwardh();
        }
        if(this.error == "h" && this.direction == "backward") {
          return this.forthBackwardh();
        }
        if(this.error == "h^2" && this.direction == "central") {
          return this.forthCentralh2();
        }
        if(this.error == "h^2" && this.direction == "forward") {
          return this.forthForwardh2();
        }
        if(this.error == "h^2" && this.direction == "backward") {
          return this.forthBackwardh2();
        }
        if(this.error == "h^4" && this.direction == "central") {
          return this.forthCentralh4();
        }
      }
    }
  }

  firstForwardh(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(this.fx, "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(0, 1);

    const approx = (fx[1] - fx[0]) / this.h;
    const errorValue = this.calErrorVal(exactValue, approx);

    result.ans = { result: approx, h: this.h, x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result;
  }

  secondForwardh(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(this.fx, "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(0, 2);

    const approx = (fx[2] - (2*fx[1]) + fx[0]) / Math.pow(this.h, 2);
    const errorValue = this.calErrorVal(exactValue, approx);

    result.ans = { result: approx, h: Math.pow(this.h, 2), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  thirdForwardh(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(derivative(this.fx, "x"), "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(0, 3);
    
    const approx = (fx[3] - (3*fx[2]) + (3*fx[1]) - fx[0]) / Math.pow(this.h, 3)
    const errorValue = this.calErrorVal(exactValue, approx)

    result.ans = { result: approx, h: Math.pow(this.h, 3), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  forthForwardh(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(derivative(derivative(this.fx, "x"), "x"), "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(0, 4);
    
    const approx = (fx[4] - (4*fx[3]) + (6*fx[2]) - (4*fx[1]) + fx[0]) / Math.pow(this.h, 4);
    const errorValue = this.calErrorVal(exactValue, approx)

    result.ans = { result: approx, h: Math.pow(this.h, 4), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  firstBackwardh(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(this.fx, "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(-1, 0);

    const approx = (fx[1] - fx[0]) / this.h;
    const errorValue = this.calErrorVal(exactValue, approx);

    result.ans = { result: approx, h: this.h, x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result;
  }

  secondBackwardh(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(this.fx, "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(-2, 0);

    const approx = (fx[2] - (2*fx[1]) + fx[0]) / Math.pow(this.h, 2);
    const errorValue = this.calErrorVal(exactValue, approx);

    result.ans = { result: approx, h: Math.pow(this.h, 2), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  thirdBackwardh(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(derivative(this.fx, "x"), "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(-3, 0);
    
    const approx = (fx[3] - (3*fx[2]) + (3*fx[1]) - fx[0]) / Math.pow(this.h, 3)
    const errorValue = this.calErrorVal(exactValue, approx)

    result.ans = { result: approx, h: Math.pow(this.h, 3), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  forthBackwardh(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(derivative(derivative(this.fx, "x"), "x"), "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(-4, 0);
    
    const approx = (fx[4] - (4*fx[3]) + (6*fx[2]) - (4*fx[1]) + fx[0]) / Math.pow(this.h, 4);
    const errorValue = this.calErrorVal(exactValue, approx)

    result.ans = { result: approx, h: Math.pow(this.h, 4), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  firstForwardh2(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(this.fx, "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(0, 2);

    const approx = (-fx[2] + (4*fx[1]) - (3*fx[0])) / (2*this.h)
    const errorValue = this.calErrorVal(exactValue, approx);

    result.ans = { result: approx, h: (2*this.h), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result;
  }

  secondForwardh2(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(this.fx, "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(0, 3);

    const approx = (-fx[3] + (4*fx[2]) - (5*fx[1]) + (2*fx[0])) / Math.pow(this.h, 2)
    const errorValue = this.calErrorVal(exactValue, approx);

    result.ans = { result: approx, h: Math.pow(this.h, 2), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  thirdForwardh2(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(derivative(this.fx, "x"), "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(0, 4);
    
    const approx = (-3*fx[4] + (14*fx[3]) - (24*fx[2]) + (18*fx[1]) - (5*fx[0])) / (2*Math.pow(this.h, 3))
    const errorValue = this.calErrorVal(exactValue, approx)

    result.ans = { result: approx, h: 2*Math.pow(this.h, 3), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  forthForwardh2(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(derivative(derivative(this.fx, "x"), "x"), "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(0, 5);
    
    const approx = ((-2*fx[5]) + (11*fx[4]) - (24*fx[3]) + (26*fx[2]) - (14*fx[1]) + (3*fx[0])) / Math.pow(this.h, 4);
    const errorValue = this.calErrorVal(exactValue, approx)

    result.ans = { result: approx, h: Math.pow(this.h, 4), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  firstBackwardh2(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(this.fx, "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(-2, 0);

    const approx = ((3*fx[2]) - (4*fx[1]) + fx[0]) / (2*this.h)
    const errorValue = this.calErrorVal(exactValue, approx);

    result.ans = { result: approx, h: 2*this.h, x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result;
  }

  secondBackwardh2(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(this.fx, "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(-3, 0);

    const approx = (2*fx[3]) - (5*fx[2]) + (4*fx[1]) - fx[0] / Math.pow(this.h, 2);
    const errorValue = this.calErrorVal(exactValue, approx);

    result.ans = { result: approx, h: Math.pow(this.h, 2), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  thirdBackwardh2(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(derivative(this.fx, "x"), "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(-4, 0);
    
    const approx = ((5*fx[4]) - (18*fx[3]) + (24*fx[2]) - (14*fx[1]) + (3*fx[0])) / (2*(Math.pow(this.h, 3)))
    const errorValue = this.calErrorVal(exactValue, approx)

    result.ans = { result: approx, h: 2*Math.pow(this.h, 3), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  forthBackwardh2(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(derivative(derivative(this.fx, "x"), "x"), "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(-5, 0);
    
    const approx = ((3*fx[5]) - (14*fx[4]) + (26*fx[3]) - (24*fx[2]) + (11*fx[1]) - (2*fx[0])) / Math.pow(this.h, 4);
    const errorValue = this.calErrorVal(exactValue, approx)

    result.ans = { result: approx, h: Math.pow(this.h, 4), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  firstCentralh2(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(this.fx, "x")
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx: number[] = []
    for(let i = -1; i <= 1; i++) {
      if(i == 0) continue;
      fx.push(this.f.evaluate({x: this.x+i*this.h}))
    }
    
    const approx = (fx[1] - fx[0]) / (2*this.h);
    const errorValue = this.calErrorVal(exactValue, approx)

    result.ans = { result: approx, h: (2*this.h), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  secondCentralh2(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(this.fx, "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(-1, 1);
    
    const approx = (fx[2] - (2*fx[1]) + fx[0]) / Math.pow(this.h, 2);
    const errorValue = this.calErrorVal(exactValue, approx)

    result.ans = { result: approx, h: Math.pow(this.h, 2), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  thirdCentralh2(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative((derivative(derivative(this.fx, "x"), "x")), "x")
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx: number[] = []
    for(let i = -2; i <= 2; i++) {
      if(i == 0) continue;
      fx.push(this.f.evaluate({x: this.x+i*this.h}))
    }
    
    const approx = (fx[3] - (2*fx[2]) + (2*fx[1]) - fx[0]) / (2*Math.pow(this.h, 3));
    const errorValue = this.calErrorVal(exactValue, approx)

    result.ans = { result: approx, h: 2*Math.pow(this.h, 3), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  forthCentralh2(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(derivative(derivative(this.fx, "x"), "x"), "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(-2, 2);
    
    const approx = (fx[4] - (4*fx[3]) + (6*fx[2]) - (4*fx[1]) + fx[0]) / Math.pow(this.h, 4);
    const errorValue = this.calErrorVal(exactValue, approx)

    result.ans = { result: approx, h: Math.pow(this.h, 4), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  firstCentralh4(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(this.fx, "x")
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx: number[] = []
    for(let i = -2; i <= 2; i++) {
      if(i == 0) continue;
      fx.push(this.f.evaluate({x: this.x+i*this.h}))
    }
    
    const approx = (-fx[3] + (8*fx[2]) - (8*fx[1]) + fx[0]) / (12*this.h);
    const errorValue = this.calErrorVal(exactValue, approx)

    result.ans = { result: approx, h: 12*this.h, x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  secondCentralh4(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(this.fx, "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(-2, 2);
    
    const approx = (-fx[4] + (16*fx[3]) - (30*fx[2]) + (16*fx[1]) - fx[0]) / (12*Math.pow(this.h, 2))
    const errorValue = this.calErrorVal(exactValue, approx)

    result.ans = { result: approx, h: 12*Math.pow(this.h, 2), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  thirdCentralh4(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative((derivative(derivative(this.fx, "x"), "x")), "x")
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx: number[] = []
    for(let i = -3; i <= 3; i++) {
      if(i == 0) continue;
      fx.push(this.f.evaluate({x: this.x+i*this.h}))
    }
    
    const approx = (-fx[5] + (8*fx[4]) - (13*fx[3]) + (13*fx[2]) - (8*fx[1]) + fx[0]) / (8*Math.pow(this.h, 3));
    const errorValue = this.calErrorVal(exactValue, approx);

    result.ans = { result: approx, h: 8*Math.pow(this.h, 8), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }

  forthCentralh4(): DiffResult {
    const result: DiffResult = {};
    const exactDiff = derivative(derivative(derivative(derivative(this.fx, "x"), "x"), "x"), "x");
    const exactValue = exactDiff.evaluate({x: this.x});

    const fx = this.calFunc(-3, 3);
    
    const approx = (-fx[6] + (12*fx[5]) - (39*fx[4]) + (56*fx[3]) - (39*fx[2]) + (12*fx[1]) - fx[0]) / (6*Math.pow(this.h, 4));
    const errorValue = this.calErrorVal(exactValue, approx);

    result.ans = { result: approx, h: 6*Math.pow(this.h, 6), x: this.x, error: this.error, order: this.order,errorValue, exactValue, exacDiff: exactDiff.toString(), direction: this.direction, fx }

    return result
  }
}