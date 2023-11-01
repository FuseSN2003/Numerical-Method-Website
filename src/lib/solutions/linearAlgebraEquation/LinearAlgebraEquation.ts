import { det } from "mathjs";

export interface MatrixInputType {
  matrixA: string[][]
  matrixB: string[]
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

export default class LinearAlgebraEquation {

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

}