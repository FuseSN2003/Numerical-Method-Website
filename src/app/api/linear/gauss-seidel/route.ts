import Solutions from "@/lib/solutions/Solutions";
import LinearAlgebraEquation, { GaussSeidelResult } from "@/lib/solutions/linearAlgebraEquation/LinearAlgebraEquation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if(req.method !== "POST") return NextResponse.json({ message: "Method Not Allow" }, { status: 405 });

  try {
    const { form, matrixA, matrixB, initialX, epsilon } = await req.json();

    const result: GaussSeidelResult = LinearAlgebraEquation.gaussSeidel(matrixA, matrixB, initialX ,epsilon);

    if(result.ans) {
      await Solutions.addData("Linear Algebra Equation Iteration", {
        matrixA: form.matrixA,
        matrixB: form.matrixB,
        initialX: form.initialX,
        epsilon: form.epsilon,
      });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.log(error)
  }
}