import Solutions from "@/lib/solutions/Solutions";
import TrapezoidalRule, { SingleTrapezoidalResult } from "@/lib/solutions/integration/TrapezoidalRule";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const form = await req.json();

    const fx = form.fx.toLowerCase()
    const a = Number(form.a);
    const b = Number(form.b);
    
    const result: SingleTrapezoidalResult = new TrapezoidalRule(fx, a, b).single();

    if(result.ans) {
      await Solutions.addData("Single Integration", {
        fx,
        a,
        b,
      });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.log(error)
  }
}