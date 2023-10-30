import Interpolation from "./Interpolation";

export interface SplineInputForm {
  pointX: string[]
  pointY: string[]
  targetX: number
  method: string
}

export interface SplineResult {
  ans?: {
    x: number
    y: number
  }
  error?: string
}

export default class SplineInterpolation extends Interpolation {
  public constructor(pointX: number[], pointY: number[], targetX: number) {
    super(pointX, pointY, targetX);
  }

  private rref(matrix: number[][]): number[][] {
    let lead = 0;
    const rowCount = matrix.length;
    const colCount = matrix[0].length;

    for (let r = 0; r < rowCount; r++) {
      if (lead >= colCount) return matrix;

      let i = r;
      while (matrix[i][lead] === 0) {
        i++;
        if (i === rowCount) {
          i = r;
          lead++;
          if (colCount === lead) return matrix;
        }
      }

      let temp = matrix[i];
      matrix[i] = matrix[r];
      matrix[r] = temp;

      let val = matrix[r][lead];
      for (let j = 0; j < colCount; j++) {
        matrix[r][j] /= val;
      }

      for (let i = 0; i < rowCount; i++) {
        if (i === r) continue;
        val = matrix[i][lead];
        for (let j = 0; j < colCount; j++) {
          matrix[i][j] -= val * matrix[r][j];
        }
      }
      lead++;
    }
    return matrix;
  }

  private linear(): SplineResult {
    const n = this.pointX.length;

    let result: number = 0;

    for (let i = 0; i < n - 1; i++) {
      if (this.targetX >= this.pointX[i] && this.targetX <= this.pointX[i + 1]) {
        const t = (this.targetX - this.pointX[i]) / (this.pointX[i + 1] - this.pointX[i]);
        result = (1 - t) * this.pointY[i] + t * this.pointY[i + 1];
      }
    }
    return { ans: { x: this.targetX, y: result }}
  }

  private quadratic(): SplineResult  {
    const n = this.pointX.length;

    const matrixA: number[][] = [];
    const matrixB: number[] = [];

    for (let i = 1; i < n; i++) {
      const rowMatrix: number[] = [];
      const x = this.pointX[i];
      const y = this.pointY[i];
  
      for (let j = 0; j < 3 * (i - 1); j++) rowMatrix.push(0);
      rowMatrix.push(x * x);
      rowMatrix.push(x);
      rowMatrix.push(1);
      for (let j = 0; j < 3 * (n - i); j++) rowMatrix.push(0);
      matrixA.push(rowMatrix);
      matrixB.push(y);
  
      const rowMatrix2: number[] = [];
      for (let j = 0; j < 3 * (i - 1) + 3; j++) rowMatrix2.push(0);
      rowMatrix2.push(x * x);
      rowMatrix2.push(x);
      rowMatrix2.push(1);
      for (let j = 0; j < 3 * (n - i - 1); j++) rowMatrix2.push(0);
      matrixA.push(rowMatrix2);
      matrixB.push(y);
    }
  
    {
      const rowMatrix: number[] = [];
      const x = this.pointX[0];
      const y = this.pointY[0];
      rowMatrix.push(x * x);
      rowMatrix.push(x);
      rowMatrix.push(1);
      for (let j = 0; j < 3 * (n - 1); j++) rowMatrix.push(0);
      matrixA.push(rowMatrix);
      matrixB.push(y);
  
      const rowMatrix2: number[] = [];
      for (let j = 0; j < 3 * (n - 1); j++) rowMatrix2.push(0);
      const x2 = this.pointX[n - 1];
      const y2 = this.pointY[n - 1];
      rowMatrix2.push(x2 * x2);
      rowMatrix2.push(x2);
      rowMatrix2.push(1);
      matrixA.push(rowMatrix2);
      matrixB.push(y2);
    }
  
    for (let i = 1; i < n; i++) {
      const rowMatrix: number[] = [];
      const x = this.pointX[i];
  
      for (let j = 0; j < 3 * (i - 1); j++) rowMatrix.push(0);
      rowMatrix.push(2 * x);
      rowMatrix.push(1);
      rowMatrix.push(0);
      rowMatrix.push(-2 * x);
      rowMatrix.push(-1);
      rowMatrix.push(0);
      for (let j = 0; j < 3 * (n - i - 1); j++) rowMatrix.push(0);
      matrixA.push(rowMatrix);
      matrixB.push(0);
    }
  
    {
      const rowMatrix: number[] = [];
      rowMatrix.push(1);
      rowMatrix.push(0);
      rowMatrix.push(0);
      for (let j = 0; j < 3 * (n - 1); j++) rowMatrix.push(0);
      matrixA.push(rowMatrix);
      matrixB.push(0);
    }
  
    for (let i = 0; i < matrixA.length; i++) {
      matrixA[i].push(matrixB[i]);
    }
  
    const matrixRREF = this.rref(matrixA);
  
    const answers = new Array(matrixRREF.length);
    for (let i = 0; i < matrixRREF.length; i++) {
      answers[i] = matrixRREF[i][matrixRREF[i].length - 1];
    }
  
    let result = -1;
  
    for (let i = 0; i < n - 1; i++) {
      const a = answers[i * 3];
      const b = answers[i * 3 + 1];
      const c = answers[i * 3 + 2];
      if (this.targetX >= this.pointX[i] && this.targetX <= this.pointX[i + 1]) {
        result = a * this.targetX * this.targetX + b * this.targetX + c;
      }
    }
  
    return { ans: { x: this.targetX, y: result }};
  }

  private cubic(): SplineResult {
    const n = this.pointX.length;
    const h = Array(n - 1);
    const alpha = Array(n - 1);
    const l = Array(n);
    const mu = Array(n - 1);
    const z = Array(n);

    for (let i = 0; i < n - 1; i++) {
      h[i] = this.pointX[i + 1] - this.pointX[i];
      alpha[i] = (3 / h[i]) * (this.pointY[i + 1] - this.pointY[i]) - (3 / h[i - 1]) * (this.pointY[i] - this.pointY[i - 1]);
    }

    l[0] = 1;
    mu[0] = 0;
    z[0] = 0;

    for (let i = 1; i < n - 1; i++) {
      l[i] = 2 * (this.pointX[i + 1] - this.pointX[i - 1]) - h[i - 1] * mu[i - 1];
      mu[i] = h[i] / l[i];
      z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
    }

    l[n - 1] = 1;
    z[n - 1] = 0;
    const c = Array(n);
    const b = Array(n - 1);
    const d = Array(n - 1);

    c[n - 1] = 0;
    for (let j = n - 2; j >= 0; j--) {
      c[j] = z[j] - mu[j] * c[j + 1];
      b[j] = (this.pointY[j + 1] - this.pointY[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
      d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
    }

    let result = 0;
    for (let i = 0; i < n - 1; i++) {
      if (this.targetX >= this.pointX[i] && this.targetX <= this.pointX[i + 1]) {
        const xDiff = this.targetX - this.pointX[i];
        const a = this.pointY[i];
        result = a + b[i] * xDiff + c[i] * xDiff ** 2 + d[i] * xDiff ** 3;
        break;
      }
    }

    return { ans: { x: this.targetX, y: result } }
  }

  public solve(method: string) {
    switch(method) {
      case "linear": {
        return this.linear();
      }
      case "quadratic": {
        return this.quadratic();
      }
      case "cubic": {
        return this.cubic();
      }
      default: {
        return this.linear()
      }
    }
  }
  
}
