"use client"

import ResultContainer from "@/components/ResultContainer";
import MatrixInput from "@/components/linear/MatrixInput"
import MatrixInputEpsilon from "@/components/linear/MatrixInputEpsilon";
import { JacobiResult } from "@/lib/solutions/linearAlgebraEquation/LinearAlgebraEquation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InlineMath } from "react-katex";

interface JacobiIterationProps {
  question: any
}

export default function JacobiIteration({ question }: JacobiIterationProps) {
  const [result, setResult] = useState<JacobiResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCalculate = async (form: any, matrixA: number[][], matrixB: number[], epsilon: number) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/linear/jacobi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({form, matrixA, matrixB, epsilon})
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
      <MatrixInputEpsilon question={question} handleCalculate={handleCalculate}/>

      <ResultContainer result={result} loading={loading}>
        {result?.ans && (
          <>
            <div className="flex gap-4">
              <InlineMath math={`\\therefore`}/>
              <div className="flex flex-col">
                {result.ans.x.map((value, index) => (
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
