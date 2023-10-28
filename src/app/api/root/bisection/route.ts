import Solutions from "@/lib/solutions/Solutions";
import BisectionMethod, { BisectionResult } from "@/lib/solutions/rootOfEquation/BisectionMethod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const form = await req.json();

    const fx = form.fx.toLowerCase()
    const xl = Number(form.xl);
    const xr = Number(form.xr);
    const epsilon = Number(form.epsilon);
    
    const result: BisectionResult = new BisectionMethod(fx, xl, xr, epsilon).solve();

    if(result.ans) {
      await Solutions.addData("Bisection Method", {
        fx,
        xl,
        xr,
        epsilon,
      });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.log(error)
  }
}