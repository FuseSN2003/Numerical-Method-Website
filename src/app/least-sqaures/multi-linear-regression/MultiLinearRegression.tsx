"use client"

import DisplayResult from "@/components/DisplayResult";
import ResultContainer from "@/components/ResultContainer";
import MultiLinearRegressionInput from "@/components/regression/MultiLinearRegressionInput";
import { MultiLinearForm, MultiLinearRegressionResult } from "@/lib/solutions/extrapolation/MultiLinearRegression"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InlineMath } from "react-katex";

interface MultiLinearRegressionProps {
  question: MultiLinearForm[]
}

export default function MultiLinearRegression({question}: MultiLinearRegressionProps) {
  const [result, setResult] = useState<MultiLinearRegressionResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCalculate = async (form: MultiLinearForm, pointX: number[][], pointY: number[], targetX: number[]) => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/least-squares/multiple-linear-regression`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({form, pointX, pointY, targetX})
      })
      
      const data = await res.json();
      console.log(data)

      if(res.ok) {
        setResult(data);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <>
      <MultiLinearRegressionInput question={question} handleCalculate={handleCalculate} />

      <ResultContainer result={result} loading={loading}>
        {result?.ans && (
          <>
            <DisplayResult>
              <h3 className="text-xl font-bold underline">Answer: </h3>
              <InlineMath math={`g(${result.ans.targetX.map((value, index) => (
                `x_{${index}} = ${value}`
              ))}) = ${result.ans.result}`}/>
            </DisplayResult>
          </>
        )}
        {result?.error && (
          <p>{result.error}</p>
        )}
      </ResultContainer>
    </>
  )
}
