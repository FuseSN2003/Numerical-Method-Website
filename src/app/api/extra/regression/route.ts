import Solutions from "@/lib/solutions/Solutions";
import Regression, { RegressionResult } from "@/lib/solutions/extrapolation/Regression";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const inputForm = await req.json();

    const { form, pointX, pointY, targetX, mOrder } = inputForm;

    const result: RegressionResult = new Regression().solve(pointX, pointY, targetX, mOrder);

    if(result.ans) {
      await Solutions.addData("Regression", {
        pointX: form.pointX.map((element: any) => (element === undefined || element === null ? "" : element)),
        pointY: form.pointY.map((element: any) => (element === undefined || element === null ? "" : element)),
        targetX: form.targetX,
        mOrder: form.mOrder,
      });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.log(error)
  }
}