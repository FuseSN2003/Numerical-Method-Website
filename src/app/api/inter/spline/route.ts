import Solutions from "@/lib/solutions/Solutions";
import SplineInterpolation, { SplineResult } from "@/lib/solutions/interpolation/SplineInterpolation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const inputForm = await req.json();

    const { form, pointX, pointY, targetX, method } = inputForm;

    const result: SplineResult = new SplineInterpolation(pointX, pointY, targetX).solve(method);

    if(result.ans) {
      await Solutions.addData("Spline Interpolation", {
        pointX: form.pointX.map((element: any) => (element === undefined || element === null ? "" : element)),
        pointY: form.pointY.map((element: any) => (element === undefined || element === null ? "" : element)),
        targetX,
        method,
      });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.log(error)
  }
}