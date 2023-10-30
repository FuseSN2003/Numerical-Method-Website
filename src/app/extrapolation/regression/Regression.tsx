"use client"

import DisplayResult from "@/components/DisplayResult";
import ResultContainer from "@/components/ResultContainer";
import RegressionInput from "@/components/extrapolate/RegressionInput";
import { RegressionForm, RegressionResult } from "@/lib/solutions/extrapolation/Regression";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InlineMath } from "react-katex";

interface RegressionProps {
  question: RegressionForm[]
}

export default function Regression({ question }: RegressionProps) {
  const [result, setResult] = useState<RegressionResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCalculate = async (form: RegressionForm, pointX: number[], pointY: number[], targetX: number, mOrder: number) => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/extra/regression`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({form, pointX, pointY, targetX, mOrder})
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
      <RegressionInput question={question} handleCalculate={handleCalculate}/>

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
  );
}
