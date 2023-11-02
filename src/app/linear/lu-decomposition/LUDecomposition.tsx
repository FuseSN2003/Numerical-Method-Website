"use client"

import ResultContainer from "@/components/ResultContainer";
import MatrixInput from "@/components/linear/MatrixInput"
import { LUResult } from "@/lib/solutions/linearAlgebraEquation/LinearAlgebraEquation";
import { createVector, formatMatrix } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { BlockMath, InlineMath } from "react-katex";

interface LUDecompositionProps {
  question: any
}

export default function LUDecomposition({ question }: LUDecompositionProps) {
  const [result, setResult] = useState<LUResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCalculate = async (form: any, matrixA: number[][], matrixB: number[]) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/linear/lu-decomposition`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({form, matrixA, matrixB})
      })

      const data = await res.json();
      if(res.ok) setResult(data);

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <>
      <MatrixInput question={question} handleCalculate={handleCalculate}/>

      <ResultContainer result={result} loading={loading}>
        {result?.ans && (
          <>
            <div className="flex flex-col gap-6 w-full py-2">
              <div className="w-full overflow-x-auto px-4 py-2 bg-primary-foreground border rounded-md">
                <BlockMath math={`A = LU`}/>
                <BlockMath math={`${formatMatrix(result.ans.matrixA)} = ${formatMatrix(result.ans.matrixL)}${formatMatrix(result.ans.matrixU)}`}/>
              </div>
              <div className="w-full overflow-x-auto">
                <BlockMath>{`LY = B`}</BlockMath>
                <BlockMath>{`${formatMatrix(result.ans.matrixL)}${createVector(result.ans.n, "y")} = ${formatMatrix(result.ans.matrixB)}`}</BlockMath>
                <h3 className="font-semibold text-lg underline">Forward Subtiution:</h3>
                {result.ans.forwardSubtiution.map((data, index) => (
                  <BlockMath key={index} math={`y_{${index+1}} ${index !== 0 ? `= ${data.b}`: ""} ${data.sumData.map((value) => {
                    return ` - (${value.y} * ${value.y})`
                  }).join('')} = ${data.y}`}/>
                ))}
              </div>
              <div className="w-full overflow-x-auto">
                <BlockMath>{`UX = Y`}</BlockMath>
                <BlockMath>{`${formatMatrix(result.ans.matrixU)}${createVector(result.ans.n, "x")} = ${formatMatrix(result.ans.matrixY)}`}</BlockMath>
                <h3 className="font-semibold text-lg underline">Backward Subtiution:</h3>
                {result.ans.backwardSubtiution.map((data, index) => (
                  <BlockMath key={index} math={`x_{${data.i}} = \\frac{${data.y} ${data.sumData.map((value) => {
                    return `- (${value.u} * ${value.x})`
                  }).join('')}}{${data.u}} = ${data.x}`}/>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <InlineMath math={`\\therefore`}/>
              <div className="flex flex-col">
                {result.ans.solutions.map((value, index) => (
                  <InlineMath key={index} math={`x_{${index+1}} = ${value}`} />
                ))}
              </div>
            </div>
          </>
        )}
        {result?.error && (
          <p>{result.error}</p>
        )}
      </ResultContainer>
    </>
  )
}
