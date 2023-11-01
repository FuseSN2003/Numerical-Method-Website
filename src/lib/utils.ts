import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getQuestion(method: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-question/${method}`)
    return res.json()
  } catch (error) {
    console.log("Failed to get question")
  }
}

export function formatMatrix1D(matrix: number[], row: boolean) {
  return `\\begin{bmatrix}
          ${matrix.join(`${row ? `&` : `\\\\`}`)}
  \\end{bmatrix}`;
}

export function formatMatrix(matrix: number[][]) {
  let out = ''
  matrix.forEach((m) => {
    m.forEach((n: number, idx: number) => {
      out += `${n}`
      out += `${idx == m.length - 1 ? '' : '&'}`
    })
    out += '\\\\'
  })

  return `\\begin{bmatrix}
          ${out}
  \\end{bmatrix}`
}

export function formatDet(matrix: number[][]) {
  let out = ''
  matrix.forEach((m) => {
    m.forEach((n: number, idx: number) => {
      out += `${n}`
      out += `${idx == m.length - 1 ? '' : '&'}`
    })
    out += '\\\\'
  })

  return `\\begin{vmatrix}
          ${out}
  \\end{vmatrix}`
}

export function createVector(n: number, c: string) {
  let vector = '\\begin{bmatrix}';
  
  for (let i = 1; i <= n; i++) {
    vector += `${c}_{${i}}`;
    if (i < n) {
      vector += ' \\\\ ';
    }
  }

  vector += '\\end{bmatrix}';

  return vector
}

export function createBackSubstitutionEquation (augmentedMatrix: number[][]): string[] {
  const equations = [];
  const n = augmentedMatrix.length;
  for (let i = n - 1; i >= 0; i--) {
    const equationParts = [];
    equationParts.push(`x_{${i + 1}} =`);

    equationParts.push(`\\frac{b_{${i + 1}}`);

    for (let j = n - 1; j >= i + 1; j--) {
      if (augmentedMatrix[i][j] !== 0) {
        equationParts.push(`- a_{${i + 1}${j + 1}}x_{${j+1}}`);
      }
    }

    equationParts.push(`}{{a_{${i + 1}${i + 1}}}}`);

    equations.push(equationParts.join(' '));
  }
  return equations;
}