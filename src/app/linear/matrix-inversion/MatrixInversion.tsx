"use client"

import ResultContainer from "@/components/ResultContainer";
import MatrixInput from "@/components/linear/MatrixInput"
import { MatrixInversionResult } from "@/lib/solutions/linearAlgebraEquation/LinearAlgebraEquation";
import { createVector, formatMatrix } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";

interface MatrixInversionProps {
  question: any
}

export default function MatrixInversion({ question }: MatrixInversionProps) {
  const [result, setResult] = useState<MatrixInversionResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCalculate = async (form: any, matrixA: number[][], matrixB: number[]) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/linear/matrix-inversion`, {
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
            <div className="flex flex-col gap-2 w-full py-2">
              <h3 className="text-lg font-semibold underline">Elimination steps:</h3>
              {result.ans.steps.map((data, index) => (
                <div key={index}>
                  {data.normalize && (
                    <div className="w-full overflow-x-auto px-4 py-2 bg-primary-foreground border rounded-md">
                      <BlockMath
                        math={`
                          pivot: \\frac{1}{a_{${data.normalize.row}${data.normalize.row}}}
                          = \\frac{1}{${data.normalize.pivot}}
                        `}
                      />
                      <BlockMath
                        math={`
                          ${formatMatrix(data.normalize.beforeNormalize)} \\xRightarrow{R_{${data.normalize.row}} = p*R_{${data.normalize.row}}}
                          ${formatMatrix(data.normalize.afterNormalize)}
                        `}
                      />
                    </div>
                  )}
                  {data.elimination && (
                    <div className="w-full px-4 py-2 overflow-x-auto">
                      <BlockMath
                        math={`
                          factor: \\frac{a_{${data.elimination.j}${data.elimination.i}}}{a_{${data.elimination.j}${data.elimination.j}}} = ${data.elimination.factor}
                        `}
                      />
                      <BlockMath
                        math={`
                          ${formatMatrix(data.elimination.beforeElimination)} \\xRightarrow{R_{${data.elimination.j}} = R_{${data.elimination.j}} - f*R_{${data.elimination.i}}} ${formatMatrix(data.elimination.afterElimination)}
                        `}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold underline">Solutions:</h3>
              <BlockMath>{`X = A^{-1}B`}</BlockMath>
              <BlockMath>{`${createVector(result.ans.n, "x")} = ${formatMatrix(result.ans.inverseMatrix)}${formatMatrix(result.ans.matrixB)}`}</BlockMath>
              <div className="flex gap-4">
                <InlineMath math={`\\therefore`}/>
                <div className="flex flex-col">
                  {result.ans.solutions.map((value, index) => (
                    <InlineMath key={index} math={`x_{${index+1}} = ${value}`} />
                  ))}
                </div>
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
