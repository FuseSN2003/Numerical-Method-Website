"use client"

import DisplayResult from "@/components/DisplayResult";
import ResultContainer from "@/components/ResultContainer";
import SplineInterpolationInput from "@/components/interpolation/SplineInterpolationInput";
import { SplineInputForm, SplineResult } from "@/lib/solutions/interpolation/SplineInterpolation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InlineMath } from "react-katex";

interface SplineInterpolationProps {
  question: SplineInputForm[]
}

export default function SplineInterpolation({ question }: SplineInterpolationProps) {

  const [result, setResult] = useState<SplineResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCalculate = async (form: SplineInputForm, pointX: number[], pointY: number[], targetX: number, method: string) => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/inter/spline`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({form, pointX, pointY, targetX, method})
      })
      
      const data = await res.json();

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
      <SplineInterpolationInput question={question} handleCalculate={handleCalculate} />

      <ResultContainer result={result} loading={loading}>
        {result?.ans && (
          <>
            <DisplayResult>
              <p>at <InlineMath math={`x = ${result.ans.x}`}/></p>
              <InlineMath math={`f(x) = f(${result.ans.x}) = ${result.ans.y}`}/>
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
