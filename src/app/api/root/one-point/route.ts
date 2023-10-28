import Solutions from "@/lib/solutions/Solutions";
import OnePointIterationMethod, { OnePointResult } from "@/lib/solutions/rootOfEquation/OnePointIterationMethod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const form = await req.json();

    const fx = form.fx.toLowerCase()
    const x0 = Number(form.x0);
    const epsilon = Number(form.epsilon);
    
    const result: OnePointResult = new OnePointIterationMethod(fx, x0, epsilon).solve();

    if(result.ans) {
      await Solutions.addData("One-Point Iteration Method", {
        fx,
        x0,
        epsilon,
      });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.log(error)
  }
}