import Solutions from "@/lib/solutions/Solutions";
import MultiLinearRegression, { MultiLinearRegressionResult } from "@/lib/solutions/extrapolation/MultiLinearRegression";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const inputForm = await req.json();

    const { form, pointX, pointY, targetX } = inputForm;

    const result: MultiLinearRegressionResult = new MultiLinearRegression().solve(pointX, pointY, targetX);

    if(result.ans) {
      await Solutions.addData("Multiple Linear Regression", {
        pointX: form.pointX.map((row: any) => row.map((element: any) => (element === undefined || element === null ? "" : element))),
        pointY: form.pointY.map((element: any) => (element === undefined || element === null ? "" : element)),
        targetX: form.targetX.map((element: any) => (element === undefined || element === null ? "" : element)),
      });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.log(error)
  }
}