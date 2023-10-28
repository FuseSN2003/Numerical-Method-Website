import Solutions from "@/lib/solutions/Solutions";
import SecantMethod, { SecantResult } from "@/lib/solutions/rootOfEquation/SecantMethod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const form = await req.json();

    const fx = form.fx.toLowerCase()
    const x0 = Number(form.x0);
    const x1 = Number(form.x1);
    const epsilon = Number(form.epsilon);
    
    const result: SecantResult = new SecantMethod(fx, x0, x1, epsilon).solve();

    if(result.ans) {
      await Solutions.addData("Secant Method", {
        fx,
        x0,
        x1,
        epsilon,
      });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.log(error)
  }
}