import Solutions from "@/lib/solutions/Solutions";
import TrapezoidalRule, { CompositeTrapezoidalResult } from "@/lib/solutions/integration/TrapezoidalRule";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const form = await req.json();

    const fx = form.fx.toLowerCase()
    const a = Number(form.a);
    const b = Number(form.b);
    const n = Number(form.n);
    
    const result: CompositeTrapezoidalResult = new TrapezoidalRule(fx, a, b).composite(n);

    if(result.ans) {
      await Solutions.addData("Composite Integration", {
        fx,
        a,
        b,
        n,
      });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.log(error)
  }
}