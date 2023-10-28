import Solutions from "@/lib/solutions/Solutions";
import GraphicalMethod, { GraphicalResult } from "@/lib/solutions/rootOfEquation/GraphicalMethod";
import { compile } from "mathjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const form = await req.json();

    const f = compile(form.fx)
    const xStart = Number(form.xStart);
    const xEnd = Number(form.xEnd);
    const epsilon = Number(form.epsilon);
    
    const result: GraphicalResult = new GraphicalMethod(f, xStart, xEnd, epsilon).solve();

    if(result.ans) {
      await Solutions.addData("Graphical Method", {
        fx: form.fx,
        xStart: Number(form.xStart),
        xEnd: Number(form.xEnd),
        epsilon: Number(form.epsilon)
      });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.log(error)
  }
}