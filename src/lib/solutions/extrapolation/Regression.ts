import Extrapolation from "./Extrapolation";

export interface RegressionForm {
  pointX: string[]
  pointY: string[]
  targetX: string
  mOrder: string
}

export interface RegressionResult {
  ans?: {
    x: number
    y: number
  }
  error?: string
}

export default class Regression extends Extrapolation {
  
  public solve(pointX: number[], pointY: number[], targetX: number, order: number): RegressionResult {
    const m = order + 1;
  
    const A = new Array(m).fill(0).map(() => new Array(m).fill(0));
    const B = new Array(m).fill(0);
    
    // Calculate the elements of A and B
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < m; j++) {
        A[i][j] = pointX.reduce((sum, xi) => sum + Math.pow(xi, i + j), 0);
      }
      B[i] = pointX.reduce((sum, xi, k) => sum + Math.pow(xi, i) * pointY[k], 0);
    }
    
    const coefficients = this.solveLinearSystem(A, B);

    let result = 0;
    for (let i = 0; i < m; i++) {
      result += coefficients[i] * Math.pow(targetX, i);
    }
    return { ans: { x: targetX, y: result }};
  }

}