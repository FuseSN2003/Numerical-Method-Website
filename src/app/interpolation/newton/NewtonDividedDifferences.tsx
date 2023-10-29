"use client"

import DisplayResult from "@/components/DisplayResult";
import InterpolationInput from "@/components/InterpolationInput";
import ResultContainer from "@/components/ResultContainer";
import { InterpolationForm } from "@/lib/solutions/interpolation/Interpolation";
import { NewtonDividedResult } from "@/lib/solutions/interpolation/NewtonDividedDifferences";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InlineMath } from "react-katex";

interface NewtonDividedDifferencesProps {
  question: InterpolationForm[]
}

export default function NewtonDividedDifferences({ question }: NewtonDividedDifferencesProps) {
  const [result, setResult] = useState<NewtonDividedResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCalculate = async (form: InterpolationForm, pointX: number[], pointY: number[], targetX: number) => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/inter/newton`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({form, pointX, pointY, targetX})
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
      <InterpolationInput question={question} handleCalculate={handleCalculate} />

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
