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