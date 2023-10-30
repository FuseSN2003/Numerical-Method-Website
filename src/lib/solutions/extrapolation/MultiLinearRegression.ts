import Extrapolation from "./Extrapolation";

export interface MultiLinearRegressionResult {
  ans?: {
    TargetX: number[]
    result: number
  }
  error?: string
}

export default class MultiLinearRegression extends Extrapolation {

  public solve(pointX: number[][], pointY: number[], targetX: number[]): MultiLinearRegressionResult {
    const order = pointX.length + 1;
    const n = pointX[0].length;

    let coefficientMatrix: number[][] = [];
    let constantMatrix: number[] = [];
    for (let rowIndex = 0; rowIndex < order; rowIndex++) {
        coefficientMatrix.push(new Array(order).fill(0));
        constantMatrix.push(0);
    }

    coefficientMatrix[0][0] = n;

    for (let i = 1; i < order; i++) {
        let sumX = 0;
        for (let j = 0; j < n; j++) {
            sumX += pointX[i - 1][j];
        }
        coefficientMatrix[0][i] = sumX;
    }

    // coefficientMatrix
    for (let i = 1; i < order; i++) {
        for (let j = 0; j < order; j++) {
            let sumX = 0;
            for (let k = 0; k < n; k++) {
                if (j === 0) {
                    sumX += pointX[i-1][k];
                } else {
                    sumX += pointX[j - 1][k] * pointX[i - 1][k];
                }
            }
            coefficientMatrix[i][j] = sumX;
        }
    }

    //constantMatrix 
    for (let i = 0; i < order; i++) {
        let sumXY = 0;
        for (let j = 0; j < n; j++) {
            if (i === 0) {
                sumXY += pointY[j];
            } else {
                sumXY += pointY[j] * pointX[i - 1][j];
            }
        }
        constantMatrix[i] = sumXY;
    }

    const coefficients = this.solveLinearSystem(coefficientMatrix, constantMatrix);

    let result = coefficients[0];
    for (let i = 1; i < coefficients.length; i++) {
      result += coefficients[i] * targetX[i - 1];
    }

    return {ans: { TargetX: targetX, result}};
  }
}