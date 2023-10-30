"use client"

import CompositeIntegrationInput from "@/components/integration/CompositeIntegrationInput";
import DisplayResult from "@/components/DisplayResult";
import ResultContainer from "@/components/ResultContainer";
import { CompositeIntegrationForm } from "@/lib/solutions/integration/Integration"
import { CompositeSimpsonResult } from "@/lib/solutions/integration/SimpsonRule";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { BlockMath } from "react-katex";

interface CompositeSimpsonRuleProps {
  question: CompositeIntegrationForm[]
}

export default function CompositeSimpsonRule({ question }: CompositeSimpsonRuleProps) {
  const [result, setResult] = useState<CompositeSimpsonResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCal = async (form: CompositeIntegrationForm) => {
    try {
      setLoading(true);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/integration/composite-simpson`, {
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
      <CompositeIntegrationInput cal={handleCal} question={question}/>

      <ResultContainer loading={loading} result={result}>
        <DisplayResult>
          {result?.ans && (
            <>
              <BlockMath
                math={`\\begin{align*} 
                  \\int_{${result.ans.a}}^{${result.ans.b}}f(x)\\\tdx &= (${result.ans.integral})\\\t \\big|_{${result.ans.a}}^{${result.ans.b}} \\\\
                  &= ${result.ans.trueIntegral} \\\\
                \\end{align*}`}
              />
              <BlockMath
                math={`\\begin{align*} 
                  h &= \\frac{b-a}{2n}
                  = \\frac{${result.ans.a} - ${result.ans.b}}{2(${result.ans.n})}
                  = ${result.ans.h}
                \\end{align*}`}
              />
              <BlockMath
                math={`\\begin{align*} 
                  x_{i} = a + ih
                \\end{align*}`}
              />
              <BlockMath
                math={`\\begin{align*} 
                  I &= \\frac{h}{3}\\bigg[f(x_{0})+f(x_{n})+4\\sum_{i=1,3,5}^{n-1}f(x_{i})+2\\sum_{i=2,4,6}^{n-1}f(x_{i})\\bigg] \\\\
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
