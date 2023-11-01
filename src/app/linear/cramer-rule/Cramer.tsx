"use client"

import ResultContainer from "@/components/ResultContainer";
import MatrixInput from "@/components/linear/MatrixInput"
import { CramerResult, MatrixInputType } from "@/lib/solutions/linearAlgebraEquation/LinearAlgebraEquation";
import { formatDet } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react"
import { BlockMath, InlineMath } from "react-katex";

interface CramerProps {
  question: MatrixInputType[]
}

export default function Cramer({ question }: CramerProps) {
  const [result, setResult] = useState<CramerResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCalculate = async (form: any, matrixA: number[][], matrixB: number[]) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/linear/cramer`, {
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
            <BlockMath math={`detA = ${formatDet(result.ans.matrixA)} = ${result.ans.detA}`} />
            {result.ans.solutionData.map((data, index) => (
              <BlockMath
                key={index}
                math={`
                  x_{${index+1}} = \\frac{detA_{${index+1}}}{detA}
                  = \\frac{${formatDet(data.matrixAi)}}{${result.ans?.detA}}
                  = \\frac{${data.detAi}}{${result.ans?.detA}} = ${data.xi}
                `}
              />
            ))}
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
