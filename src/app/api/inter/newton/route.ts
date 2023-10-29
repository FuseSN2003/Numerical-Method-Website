import Solutions from "@/lib/solutions/Solutions";
import { InterpolationForm } from "@/lib/solutions/interpolation/Interpolation";
import NewtonDividedDifferences, { NewtonDividedResult } from "@/lib/solutions/interpolation/NewtonDividedDifferences";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const inputForm = await req.json();

    const { form, pointX, pointY, targetX } = inputForm;

    const result: NewtonDividedResult = new NewtonDividedDifferences(pointX, pointY, targetX).solve();

    if(result.ans) {
      await Solutions.addData("Newton Divided-Differences", {
        pointX: form.pointX.map((element: any) => (element === undefined || element === null ? "" : element)),
        pointY: form.pointY.map((element: any) => (element === undefined || element === null ? "" : element)),
        targetX: form.targetX,
        selectedPoint: form.selectedPoint.map((element: any) => (element === undefined || element === null ? false : element)),
      });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.log(error)
  }
}