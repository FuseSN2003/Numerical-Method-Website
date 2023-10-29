import Interpolation from "./Interpolation";

export interface LagrangeResult {
  ans?: {
    x: number
    y: number
  },
  error?: string
}

export default class LagrangeInterpolation extends Interpolation {
  constructor(pointX: number[], pointY: number[], targetX: number) {
    super(pointX, pointY, targetX);
  }

  public solve() {
    const result: LagrangeResult = {}
    const n = this.pointX.length;
    let y = 0;

    for (let i = 0; i < n; i++) {
      let term = this.pointY[i];
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          term *= (this.targetX - this.pointX[j]) / (this.pointX[i] - this.pointX[j]);
        }
      }
      y += term;
    }

    result.ans = { x: this.targetX, y}

    return result;
  }
}