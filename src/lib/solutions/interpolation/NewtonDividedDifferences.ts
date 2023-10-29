import Interpolation from "./Interpolation";

export interface NewtonDividedResult {
  ans?: {
    x: number
    y: number
  }
  error?: string
}

export default class NewtonDividedDifferences extends Interpolation {

  public constructor(pointX: number[], pointY: number[], targetX: number) {
    super(pointX, pointY, targetX)
  }

  public solve(): NewtonDividedResult {
    const n = this.pointX.length;
    const dividedDifferenceTable: number[][] = new Array(n);
    const result: NewtonDividedResult = {}

    for (let i = 0; i < n; i++) {
      dividedDifferenceTable[i] = [];
      dividedDifferenceTable[i][0] = this.pointY[i];
    }

    for (let col = 1; col < n; col++) {
      for (let row = 0; row < n - col; row++) {
        dividedDifferenceTable[row][col] = (dividedDifferenceTable[row + 1][col - 1] - dividedDifferenceTable[row][col - 1]) / (this.pointX[row + col] - this.pointX[row]);
      }
    }

    let y = dividedDifferenceTable[0][0];
    let product = 1;
    for (let i = 1; i < n; i++) {
      product *= (this.targetX - this.pointX[i - 1]);
      y += product * dividedDifferenceTable[0][i];
    }

    result.ans = { x: this.targetX, y };

    return result;
  }
}