"use client"

import DisplayResult from "@/components/DisplayResult";
import ResultContainer from "@/components/ResultContainer";
import SingleIntegrationInput from "@/components/integrate/SingleIntegrationInput"
import { SingleIntegrationForm } from "@/lib/solutions/integration/Integration"
import { SingleSimpsonResult } from "@/lib/solutions/integration/SimpsonRule";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { BlockMath } from "react-katex";

interface SingleSimpsonRuleProps {
  question: SingleIntegrationForm[]
}

export default function SingleSimpsonRule({ question }: SingleSimpsonRuleProps) {
  const [result, setResult] = useState<SingleSimpsonResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCal = async (form: SingleIntegrationForm) => {
    try {
      setLoading(true);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/integration/single-simpson`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      })
      
      const data = await res.json();
      console.log(data)
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
                  h &= \\frac{b-a}{2}
                  = \\frac{${result.ans.a} - ${result.ans.b}}{2}
                  = ${result.ans.h}
                \\end{align*}`}
              />
              <BlockMath
                math={`\\begin{align*} 
                  I &= \\frac{h}{3} * \\big[f(x_{0})+4f(x_{1})+f(x_{2})\\big] \\\\
                  &= \\frac{${result.ans.h}}{3} * \\big[f(${result.ans.a})+4f(${result.ans.x1})+f(${result.ans.b})\\big] \\\\
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
