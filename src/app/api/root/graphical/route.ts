import Solutions from "@/lib/solutions/Solutions";
import GraphicalMethod, { GraphicalResult } from "@/lib/solutions/rootOfEquation/GraphicalMethod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const form = await req.json();

    const fx = form.fx.toLowerCase()
    const xStart = Number(form.xStart);
    const xEnd = Number(form.xEnd);
    const epsilon = Number(form.epsilon);
    
    const result: GraphicalResult = new GraphicalMethod(fx, xStart, xEnd, epsilon).solve();

    if(!result.error) {
      await Solutions.addData("Graphical Method", {
        fx: form.fx,
        xStart,
        xEnd,
        epsilon,
      });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.log(error)
  }
}