"use client"

import ResultContainer from "@/components/ResultContainer";
import MatrixInput from "@/components/linear/MatrixInput"
import { GaussResult } from "@/lib/solutions/linearAlgebraEquation/LinearAlgebraEquation";
import { createBackSubstitutionEquation, formatMatrix } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react"
import { BlockMath, InlineMath } from "react-katex";

interface GaussEliminationProps {
  question: any
}

export default function GaussElimination({ question }: GaussEliminationProps) {
  const [result, setResult] = useState<GaussResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCalculate = async (form: any, matrixA: number[][], matrixB: number[]) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/linear/gauss`, {
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
            <div className="flex flex-col gap-2 w-full overflow-x-auto py-2">
              <h3 className="text-lg font-semibold">Eliminations:</h3>
              {result.ans.eliminationSteps.map((data, index) => (
                <div key={index}>
                  <BlockMath
                    math={`
                      factor: \\frac{a_{${data.j}${data.i}}}{a_{${data.j}${data.j}}}
                      = \\frac{${data.matrixji}}{${data.matrixii}}
                      = ${data.factor}
                    `}
                  />
                  <BlockMath
                    math={`
                      ${formatMatrix(data.beforeElimination)} \\xRightarrow{R_{${data.j}} = R_{${data.j}} - f*R_{${data.i}}} ${formatMatrix(data.afterElimination)}
                    `}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 w-full overflow-x-auto py-2">
              <h3 className="text-lg font-semibold">Back Subtiution:</h3>
              {createBackSubstitutionEquation(result.ans.augmentedMatrix).map((data, index) => (
                  <BlockMath key={index}>{`${data}`}</BlockMath>
                ))}
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
      </ResultContainer>
    </>
  )
}
