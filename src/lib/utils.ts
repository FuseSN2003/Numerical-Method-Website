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

export function formatMatrix(matrix: number[][], precision: number = 6) {
  let out = ''
  matrix.forEach((m) => {
    m.forEach((n: number, idx: number) => {
      out += `${Number(Number(n.toFixed(precision)))}`
      out += `${idx == m.length - 1 ? '' : '&'}`
    })
    out += '\\\\'
  })

  return `\\begin{bmatrix}
          ${out}
  \\end{bmatrix}`
}

export function formatDet(matrix: number[][], precision: number = 6) {
  let out = ''
  matrix.forEach((m) => {
    m.forEach((n: number, idx: number) => {
      out += `${Number(Number(n.toFixed(precision)))}`
      out += `${idx == m.length - 1 ? '' : '&'}`
    })
    out += '\\\\'
  })

  return `\\begin{vmatrix}
          ${out}
  \\end{vmatrix}`
}