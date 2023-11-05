import { det, sqrt } from "mathjs";

export interface MatrixInputType {
  matrixA: string[][]
  matrixB: string[]
}

export interface ConjugateGradientType {
  matrixA: string[][]
  matrixB: string[]
  guessX: string[]
  epsilon: string
}

export interface MatrixInputEpsilonType {
  matrixA: string[][]
  matrixB: string[]
  epsilon: string
}

interface CramerStep {
  matrixAi: number[][]
  detAi: number
  xi: number
}

export interface CramerResult {
  ans?: {
    matrixA: number[][]
    detA: number
    solutionData: CramerStep[]
    solutions: number[]
  }
  error?: string
}

interface GaussEliminationStep {
  factor: number
  beforeElimination: number[][]
  afterElimination: number[][]
  j: number
  i: number
  matrixji: number
  matrixii: number
}

export interface GaussResult {
  ans?: {
    solutions: number[]
    eliminationSteps: GaussEliminationStep[]
    augmentedMatrix: number[][]
  }
  error?: string
}

interface EliminationStep {
  factor: number
  beforeElimination: number[][]
  afterElimination: number[][]
  i: number
  j: number
}

interface NormalizeStep {
  beforeNormalize: number[][]
  afterNormalize: number[][]
  pivot: number
  row: number
}

interface GaussJordanStep {
  elimination?: EliminationStep
  normalize?: NormalizeStep
}

export interface GaussJordanResult {
  ans?: {
    solutions: number[]
    steps: GaussJordanStep[]
  }
  error?: string
}

interface InversionEliminationStep {
  factor: number
  beforeElimination: number[][]
  afterElimination: number[][]
  i: number
  j: number
}

interface InversionNormalizeStep {
  beforeNormalize: number[][]
  afterNormalize: number[][]
  pivot: number
  row: number
}

interface MatrixInversionStep {
  elimination?: InversionEliminationStep
  normalize?: InversionNormalizeStep
}

export interface MatrixInversionResult {
  ans?: {
    solutions: number[]
    steps: MatrixInversionStep[]
    inverseMatrix: number[][]
    matrixB: number[][]
    n: number
  }
  error?: string
}

interface LUForwardSumData {
  l: number
  y: number
}

interface LUBackwardSumData {
  u: number
  x: number
}

interface LUForwardSubtiution {
  y: number
  b: number
  sumData: LUForwardSumData[]
}

interface LUBackwardSubtiution {
  y: number
  u: number
  x: number
  i: number
  sumData: LUBackwardSumData[]
}

export interface LUResult {
  ans?: {
    solutions: number[]
    forwardSubtiution: LUForwardSubtiution[]
    backwardSubtiution: LUBackwardSubtiution[]
    matrixA: number[][]
    matrixB: number[][]
    matrixY: number[][]
    matrixL: number[][]
    matrixU: number[][]
    n: number
  }
  error?: string
}

export interface CholeskyResult {
  ans?: {
    x: number[]
  }
  error?: string
}

export interface JacobiResult {
  ans?: {
    x: number[]
  }
  error?: string
}

export interface GaussSeidelResult {
  ans?: {
    x: number[]
  }
  error?: string
}

export interface ConjugateResult {
  ans?: {
    x: number[]
  }
  error?: string
}
export default class LinearAlgebraEquation {

  public static createIdentityMatrix(size: number): number[][] {
    return Array.from({ length: size }, (_, i) => {
      return Array.from({ length: size }, (_, j) => (i === j ? 1 : 0));
    });
  }

  public static cramer(matrixA:number[][], matrixB: number[]): CramerResult {
    const n = matrixA.length;
    const result: CramerResult = {};
    const solutions: number[] = [];
    const solutionData: CramerStep[] = []

    const detA = det(matrixA)
    if(detA === 0) {
      result.error = "detA = 0";
      return result;
    }
    
    for(let i = 0; i < n; i++) {
      let matrixAi = matrixA.map((row:number[]) => [...row])
      for(let j = 0; j < n; j++) {
        matrixAi[j][i] = matrixB[j]
      }
      const detAi = det(matrixAi)
      const xi = detAi / detA
      solutionData.push({ matrixAi, detAi, xi })
      solutions.push(xi)
    }

    result.ans = { matrixA, detA, solutions, solutionData }

    return result;
  }

  public static gauss(matrixA: number[][], matrixB: number[]): GaussResult {
    const n = matrixA.length;
    const result: GaussResult = {};
    const eliminationSteps: GaussEliminationStep[] = []
    const solutions: number[] = [];
    const augmentedMatrix: number[][] = []

    for(let i = 0; i < n; i++) {
      augmentedMatrix.push([...matrixA[i], matrixB[i]])
    }

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const factor = augmentedMatrix[j][i] / augmentedMatrix[i][i];
        const beforeElimination = augmentedMatrix.map(row => Array.from(row));
        const matrixji = augmentedMatrix[j][i];
        const matrixii = augmentedMatrix[i][i];
        for (let k = i; k < n + 1; k++) {
          augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k];
        }
        const afterElimination = augmentedMatrix.map(row => Array.from(row));
        eliminationSteps.push({factor, beforeElimination, afterElimination, i: i+1, j: j+1, matrixji, matrixii})
      }
    }

    for (let i = n - 1; i >= 0; i--) {
      solutions[i] = augmentedMatrix[i][n] / augmentedMatrix[i][i];
      for (let k = i - 1; k >= 0; k--) {
        augmentedMatrix[k][n] -= augmentedMatrix[k][i] * solutions[i];
      }
    }

    result.ans = { augmentedMatrix, solutions, eliminationSteps }

    return result;
  }

  public static gaussJordan(matrixA: number[][], matrixB: number[]): GaussJordanResult {
    const n = matrixA.length;
    const result: GaussJordanResult = {};
    const augmentedMatrix: number[][] = [];
    const steps: GaussJordanStep[] = [];
    const solutions: number[] = [];

    for(let i = 0; i < n; i++) {
      augmentedMatrix.push([...matrixA[i], matrixB[i]])
    }

    for (let i = 0; i < n; i++) {
      if (augmentedMatrix[i][i] === 0) {
        continue;
      }
      const beforeNormalize = augmentedMatrix.map(row => Array.from(row));
      const pivot = augmentedMatrix[i][i];
      for (let j = i; j < n + 1; j++) {
        augmentedMatrix[i][j] /= pivot;
      }
      const afterNormalize = augmentedMatrix.map(row => Array.from(row));
      steps.push({normalize: {beforeNormalize, afterNormalize, pivot, row: i + 1}});
  
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = -augmentedMatrix[k][i];
          const beforeElimination = augmentedMatrix.map(row => Array.from(row));
          for (let j = i; j < n + 1; j++) {
            augmentedMatrix[k][j] += factor * augmentedMatrix[i][j];
          }
          const afterElimination = augmentedMatrix.map(row => Array.from(row));
          steps.push({elimination: {factor, beforeElimination, afterElimination,i: i +1, j: k+ 1}})
        }
      }
    }

    for (let i = 0; i < n; i++) {
      solutions[i] = augmentedMatrix[i][n];
    }

    result.ans = { solutions, steps }
    
    return result;
  }

  public static matrixInversion(matrixA: number[][], matrixB: number[]): MatrixInversionResult {
    const n = matrixA.length;
    const result: MatrixInversionResult = {};
    const augmentedMatrix: number[][] = [];
    const steps: MatrixInversionStep[] = [];
    const solutions: number[] = [];

    for (let i = 0; i < n; i++) {
      augmentedMatrix.push([...matrixA[i], ...this.createIdentityMatrix(n)[i]]);
    }
    
    for (let i = 0; i < n; i++) {
      const beforeNormalize = augmentedMatrix.map(row => Array.from(row));
      const pivot = augmentedMatrix[i][i];
      if (pivot === 0) {
        let foundNonZero = false;
        for (let k = i + 1; k < n; k++) {
          if (augmentedMatrix[k][i] !== 0) {
            [augmentedMatrix[i], augmentedMatrix[k]] = [augmentedMatrix[k], augmentedMatrix[i]];
            foundNonZero = true;
            break;
          }
        }

        if (!foundNonZero) {
          result.error = "Matrix is singular and not invertible.";
          return result;
        }
      }

      for (let j = 0; j < 2 * n; j++) {
        augmentedMatrix[i][j] /= pivot;
      }
      const afterNormalize = augmentedMatrix.map(row => Array.from(row));
      steps.push({normalize: { beforeNormalize, afterNormalize, pivot, row: i + 1}})
      
      for (let k = 0; k < n; k++) {
        const beforeElimination = augmentedMatrix.map(row => Array.from(row));
        if (k !== i) {
          const factor = -augmentedMatrix[k][i];
          for (let j = 0; j < 2 * n; j++) {
            augmentedMatrix[k][j] += factor * augmentedMatrix[i][j];
          }
          const afterElimination = augmentedMatrix.map(row => Array.from(row));
          steps.push({elimination: {factor, beforeElimination, afterElimination,i: i +1, j: k+ 1}})
        }
      }
    }

    const inverseMatrix = augmentedMatrix.map(row => row.slice(n, 2 * n));

    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        sum += inverseMatrix[i][j] * matrixB[j];
      }
      solutions.push(sum);
    }

    const matrixB2D = matrixB.map(value => [Number(value)]);;

    result.ans = { n, inverseMatrix, matrixB: matrixB2D, steps, solutions }

    return result;
  }

  public static luDecomposition(matrixA: number[][], matrixB: number[]): LUResult {
    const n = matrixA.length;
    const result: LUResult = {};

    const L = Array.from({ length: n }, () => Array(n).fill(0));
    const U = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let k = i; k < n; k++) {
        let sum = 0;
        for (let j = 0; j < i; j++) {
          sum += L[i][j] * U[j][k];
        }
        U[i][k] = matrixA[i][k] - sum;
      }

      for (let k = i; k < n; k++) {
        if (i == k) {
          L[i][i] = 1;
        } else {
          let sum = 0;
          for (let j = 0; j < i; j++) {
            sum += L[k][j] * U[j][i];
          }
          L[k][i] = (matrixA[k][i] - sum) / U[i][i];
        }
      }
    }

    const y: number[] = [];
    const x: number[] = [];
    const forwardSubtiution: LUForwardSubtiution[] = []
    const backwardSubtiution: LUBackwardSubtiution[] = []

    for (let i = 0; i < n; i++) {
      let sum = 0;
      const sumData: LUForwardSumData[] = [];
      for (let j = 0; j < i; j++) {
        sum += L[i][j] * y[j];
        sumData.push({l: L[i][j], y: y[j]})
      }
      y[i] = matrixB[i] - sum;
      forwardSubtiution.push({y: y[i], b: matrixB[i], sumData})
    }

    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      const sumData: LUBackwardSumData[] = [];
      for (let j = i + 1; j < n; j++){
        sum += U[i][j] * x[j];
        sumData.push({u: U[i][j], x: x[j]})
      }
      x[i] = (y[i] - sum) / U[i][i];
      backwardSubtiution.push({y: y[i], u: U[i][i], x: x[i], sumData, i: i + 1})
    }

    const matrixB2D = matrixB.map(value => [Number(value)]);
    const matrixY2D = y.map(value => [Number(value)]);

    result.ans = { solutions: x, matrixU: U, matrixL: L, matrixA, matrixB: matrixB2D, matrixY: matrixY2D, n, forwardSubtiution, backwardSubtiution }

    return result;
  }

  public static cholesky(matrixA: number[][], matrixB: number[]): CholeskyResult {
    const n = matrixA.length;
    const result: CholeskyResult = {};

    const L = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      let sum = 0;

      for (let k = 0; k < i; k++) {
        sum += Math.pow(L[i][k], 2);
      }

      L[i][i] = sqrt(matrixA[i][i] - sum);

      for (let j = i + 1; j < n; j++) {
        let sum = 0;

        for (let k = 0; k < i; k++) {
          sum += L[i][k] * L[j][k];
        }

        L[j][i] = (matrixA[j][i] - sum) / L[i][i];
      }
    }
    
    const y: number[] = new Array(n);

    for (let i = 0; i < n; i++) {
      let sum = 0;

      for (let j = 0; j < i; j++) {
        sum += L[i][j] * y[j];
      }

      y[i] = (matrixB[i] - sum) / L[i][i];
    }

    const x: number[] = new Array(n);

    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;

      for (let j = i + 1; j < n; j++) {
        sum += L[j][i] * x[j];
      }

      x[i] = (y[i] - sum) / L[i][i];
    }

    result.ans = { x };

    return result;
  }

  public static jacobi(matrixA: number[][], matrixB: number[], epsilon: number): JacobiResult {
    const n = matrixA.length;
    const result: JacobiResult = {};

    const x = new Array(n).fill(0);
    const xOld = new Array(n).fill(0);

    for (let k = 0; k < 1000; k++) {
      for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {
          if (j !== i) {
            sum += matrixA[i][j] * xOld[j];
          }
        }
        x[i] = (matrixB[i] - sum) / matrixA[i][i];
      }
  
      let error = 0;
      for (let i = 0; i < n; i++) {
        error = (Math.abs((x[i] - xOld[i]) / x[i]) * 100);
      }
  
      // Update the old solution
      for (let i = 0; i < n; i++) {
        xOld[i] = x[i];
      }
  
      // Check for convergence
      if (error < epsilon) {
        break;
      }
    }

    result.ans = { x }

    return result;
  }

  public static gaussSeidel(matrixA: number[][], matrixB: number[], epsilon: number): GaussSeidelResult {
    const n = matrixA.length;
    const result: GaussSeidelResult = {};

    const x = new Array(n).fill(0);

    for (let k = 0; k < 1000; k++) {
      let error = 0;

      for (let i = 0; i < n; i++) {
        let sum1 = 0;
        let sum2 = 0;

        for (let j = 0; j < i; j++) {
          sum1 += matrixA[i][j] * x[j];
        }

        for (let j = i + 1; j < n; j++) {
          sum2 += matrixA[i][j] * x[j];
        }

        x[i] = (matrixB[i] - sum1 - sum2) / matrixA[i][i];
      }

      for (let i = 0; i < n; i++) {
        error += Math.abs(x[i] - x[i - 1] || 0);
      }

      // Check for convergence
      if (error < epsilon) {
        break;
      }
    }

    result.ans = { x };

    return result;
  }

  public static conjugateGradient(matrixA: number[][], matrixB: number[], guessX: number[], epsilon: number): ConjugateResult {
    const result: ConjugateResult = {}
    
    let x = [...guessX];
    let r = this.vectorSubtract(matrixB, this.matrixVectorMultiply(matrixA, x));
    let p = [...r];
    let rsold = this.vectorDot(r, r);

    for (let i = 0; i < 1000; i++) {
      const Ap = this.matrixVectorMultiply(matrixA, p);
      const alpha = rsold / this.vectorDot(p, Ap);
      x = this.vectorAdd(x, this.vectorScale(alpha, p));
      r = this.vectorSubtract(r, this.vectorScale(alpha, Ap));
      const rsnew = this.vectorDot(r, r);

      if (Math.sqrt(rsnew) < epsilon) {
        break;
      }

      p = this.vectorAdd(r, this.vectorScale(rsnew / rsold, p));
      rsold = rsnew;
    }

    result.ans = { x }

    return result;
  }

  private static vectorAdd(u: number[], v: number[]): number[] {
    return u.map((x, i) => x + v[i]);
  }

  private static vectorSubtract(u: number[], v: number[]): number[] {
    return u.map((x, i) => x - v[i]);
  }

  private static vectorDot(u: number[], v: number[]): number {
    return u.reduce((acc, x, i) => acc + x * v[i], 0);
  }

  private static vectorScale(scalar: number, v: number[]): number[] {
    return v.map(x => scalar * x);
  }

  private static matrixVectorMultiply(A: number[][], x: number[]): number[] {
    return A.map(row => this.vectorDot(row, x));
  }
}