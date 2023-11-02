import Solutions from "@/lib/solutions/Solutions";
import LinearAlgebraEquation, { LUResult } from "@/lib/solutions/linearAlgebraEquation/LinearAlgebraEquation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const { form, matrixA, matrixB } = await req.json();

    const result: LUResult = LinearAlgebraEquation.luDecomposition(matrixA, matrixB);

    if(result.ans) {
      await Solutions.addData("Linear Algebra Equation", {
        matrixA: form.matrixA,
        matrixB: form.matrixB,
      });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.log(error)
  }
}