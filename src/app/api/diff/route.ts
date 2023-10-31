import Solutions from "@/lib/solutions/Solutions";
import Differentiation from "@/lib/solutions/differentiation/Differentiation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const form = await req.json();
    
    const fx = form.fx;
    const order = Number(form.order);
    const direction = form.direction;
    const error = form.error;
    const x = Number(form.x);
    const h = Number(form.h);

    const result = new Differentiation(fx, order, direction, error, h, x).solve();

    if(result?.ans) {
      await Solutions.addData("Differentiation", {
        fx: form.fx,
        order: form.order,
        direction: form.direction,
        error: form.error,
        x: form.x,
        h: form.h
      })
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.log(error)
  }
}