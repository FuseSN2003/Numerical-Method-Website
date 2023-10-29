import Solutions from "@/lib/solutions/Solutions";
import SimpsonRule, { SingleSimpsonResult } from "@/lib/solutions/integration/SimpsonRule";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const form = await req.json();

    const fx = form.fx.toLowerCase()
    const a = Number(form.a);
    const b = Number(form.b);
    
    const result: SingleSimpsonResult = new SimpsonRule(fx, a, b).single();

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