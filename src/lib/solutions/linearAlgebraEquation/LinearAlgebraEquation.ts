import { det } from "mathjs";

interface CramerSolution {
  matrixAi: number[][]
  detAi: number
  xi: number
}

export interface CramerResult {
  ans?: {
    matrixA: number[][]
    detA: number
    solutionData: CramerSolution[]
    solution: number[]
  }
  error?: string
}

export default class LinearAlgebraEquation {

  public static cramer(matrixA:number[][], matrixB: number[]): CramerResult {
    const n = matrixA.length;
    const result: CramerResult = {};
    const solution: number[] = [];
    const solutionData: CramerSolution[] = []

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
      solution.push(xi)
    }

    result.ans = { matrixA, detA, solution, solutionData }

    return result;
  }

}