"use client"

import DisplayResult from "@/components/DisplayResult";
import ResultContainer from "@/components/ResultContainer";
import SingleIntegrationInput from "@/components/integration/SingleIntegrationInput"
import { SingleIntegrationForm } from "@/lib/solutions/integration/Integration"
import { SingleTrapezoidalResult } from "@/lib/solutions/integration/TrapezoidalRule";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { BlockMath } from "react-katex";

interface SingleTrapezoidalRuleProps {
  question: SingleIntegrationForm[]
}

export default function SingleTrapezoidalRule({ question }: SingleTrapezoidalRuleProps) {
  const [result, setResult] = useState<SingleTrapezoidalResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCal = async (form: SingleIntegrationForm) => {
    try {
      setLoading(true);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/integration/single-trapezoidal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      })
      
      const data = await res.json();
      
      if(res.ok) {
        setResult(data);
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <>
      <SingleIntegrationInput cal={handleCal} question={question}/>

      <ResultContainer loading={loading} result={result}>
        <DisplayResult>
          {result?.ans && (
            <>
              <BlockMath
                math={`\\begin{align*} 
                  \\int_{${result.ans.a}}^{${result.ans.b}}(${result.ans.fx})\\\tdx &= (${result.ans.integral})\\\t \\big|_{${result.ans.a}}^{${result.ans.b}} \\\\
                  &= ${result.ans.trueIntegral} \\\\
                \\end{align*}`}
              />
              <BlockMath
                math={`\\begin{align*} 
                  I &= \\frac{b-a}{2} * \\big[f(x_{0})+f(x_{1})\\big] \\\\
                  &= \\frac{${result.ans.b}-${result.ans.a}}{2} * \\big[f(${result.ans.a})+f(${result.ans.b})\\big] \\\\
                  &= \\frac{${result.ans.b}-${result.ans.a}}{2} * \\big[${result.ans.fxa}+${result.ans.fxb})\\big] \\\\
                  &= ${result.ans.approxI}
                \\end{align*}`}
              />
              <BlockMath
                math={`\\begin{align*} 
                  \\epsilon &= \\bigg|\\frac{\\int_{${result.ans.a}}^{${result.ans.b}}f(x)dx - I}{\\int_{${result.ans.a}}^{${result.ans.b}}f(x)dx} \\bigg| * 100 \\\\
                  &= \\bigg|\\frac{${result.ans.trueIntegral} - ${result.ans.approxI}}{${result.ans.trueIntegral}} \\bigg| * 100 \\\\
                  &= ${result.ans.tolerance}\\%
                \\end{align*}`}
              />
            </>
          )}
          {result?.error && (
            <p>{result.error}</p>
          )}
        </DisplayResult>
      </ResultContainer>
    </>
  )
}
