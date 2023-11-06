import { DiffResult } from "@/lib/solutions/differentiation/Differentiation";
import React from "react";
import { BlockMath, InlineMath } from "react-katex";

interface DisplayDiff {
  result: DiffResult
}

export default function DisplayDiff({ result }: DisplayDiff) {
  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-8">
      {/* First */}
      {result.ans?.order === 1 && (
        <>
          {(result.ans.direction == "forward" && result.ans.error == "h") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>First Forward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{\\prime}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{\\prime}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{\\prime}(x_i) &= \\frac{f(x_{i+1}) - f(x_i)}{h} \\\\
                f^{\\prime}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{\\prime}(x)_{exact} - f^{\\prime}(x)_{approx}}{f^{\\prime}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans.direction == "backward" && result.ans.error == "h") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>First Backward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{\\prime}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{\\prime}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{\\prime}(x_i) &= \\frac{f(x_{i}) - f(x_{i-1})}{h} \\\\
                f^{\\prime}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{\\prime}(x)_{exact} - f^{\\prime}(x)_{approx}}{f^{\\prime}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans.direction == "central" && result.ans.error == "h^2") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>First Central Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^2`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{\\prime}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{\\prime}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{\\prime}(x_i) &= \\frac{f(x_{i+1}) - f(x_{i-1})}{2h} \\\\
                f^{\\prime}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{\\prime}(x)_{exact} - f^{\\prime}(x)_{approx}}{f^{\\prime}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans.direction == "forward" && result.ans.error == "h^2") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>First Forward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^2`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{\\prime}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{\\prime}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{\\prime}(x_i) &= \\frac{-f(x_{i+2}) + 4f(x_{i+1}) - 3f(x_i)}{2h} \\\\
                f^{\\prime}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{\\prime}(x)_{exact} - f^{\\prime}(x)_{approx}}{f^{\\prime}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans.direction == "backward" && result.ans.error == "h^2") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>First Backward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^2`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{\\prime}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{\\prime}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{\\prime}(x_i) &= \\frac{3f(x_i) - 4f(x_{i-1}) + f(x_{i-2})}{2h} \\\\
                f^{\\prime}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{\\prime}(x)_{exact} - f^{\\prime}(x)_{approx}}{f^{\\prime}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans.direction == "central" && result.ans.error == "h^4") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>First Central Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^4`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{\\prime}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{\\prime}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{\\prime}(x_i) &= \\frac{-f(x_{i+2}) + 8f(x_{i+1}) - 8f(x_{i-1}) + f(x_{i-2})}{12h} \\\\
                f^{\\prime}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{\\prime}(x)_{exact} - f^{\\prime}(x)_{approx}}{f^{\\prime}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
        </>
      )}
      

      {/* Second */}
      {result.ans?.order === 2 && (
        <>
          {(result.ans?.direction == "forward" && result.ans.error == "h") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Second Forward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(2)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(2)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>
            
              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(2)}}(x_i) &= \\frac{f(x_{i+2}) - 2f(x_{i+1}) + f(x_{i})}{h^2} \\\\
                f^{${`{\\prime}`.repeat(2)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(2)}}(x)_{exact} - f^{${`{\\prime}`.repeat(2)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(2)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "backward" && result.ans.error == "h") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Second Backward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(2)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(2)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(2)}}(x_i) &= \\frac{f(x_{i}) - 2f(x_{i-1}) + f(x_{i-2})}{h^2} \\\\
                f^{${`{\\prime}`.repeat(2)}}(${result.ans.x})&= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(2)}}(x)_{exact} - f^{${`{\\prime}`.repeat(2)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(2)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "central" && result.ans.error == "h^2") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Second Central Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^2`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(2)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(2)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(2)}}(x_i) &= \\frac{f(x_{i+1}) - 2f(x_{i}) + f(x_{i-1})}{h^2} \\\\
                f^{${`{\\prime}`.repeat(2)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(2)}}(x)_{exact} - f^{${`{\\prime}`.repeat(2)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(2)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "forward" && result.ans.error == "h^2") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Second Forward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^2`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(2)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(2)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>
            
              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(2)}}(x_i) &= \\frac{-f(x_{i+3}) + 4f(x_{i+2}) - 5f(x_{i+1}) + 2 f(x_i)}{h^2} \\\\
                f^{${`{\\prime}`.repeat(2)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(2)}}(x)_{exact} - f^{${`{\\prime}`.repeat(2)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(2)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "backward" && result.ans.error == "h^2") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Second Backward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^2`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(2)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(2)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(2)}}(x_i) &= \\frac{2f(x_i) - 5f(x_{i-1}) + 4f(x_{i-2}) - f(x_{i-3})}{h^2} \\\\
                f^{${`{\\prime}`.repeat(2)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(2)}}(x)_{exact} - f^{${`{\\prime}`.repeat(2)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(2)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "central" && result.ans.error == "h^4") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Second Central Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^4`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(2)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(2)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(2)}}(x_i) &= \\frac{-f(x_{i+2}) + 16f(x_{i+1}) - 30f(x_i) + 16f(x_{i-1}) - f(x_{i-2})}{12h^2} \\\\
                f^{${`{\\prime}`.repeat(2)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(2)}}(x)_{exact} - f^{${`{\\prime}`.repeat(2)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(2)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
        </>
      )}

      {/* Third */}
      {result.ans?.order === 3 && (
        <>
          {(result.ans?.direction == "forward" && result.ans.error == "h") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Third Forward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(3)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(3)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>
            
              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(3)}}(x_i) &= \\frac{f(x_{i+3}) - 3f(x_{i+2}) + 3f(x_{i+1}) - f(x_i)}{h^3} \\\\
                f^{${`{\\prime}`.repeat(3)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(3)}}(x)_{exact} - f^{${`{\\prime}`.repeat(3)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(3)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "backward" && result.ans.error == "h") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Third Backward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(3)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(3)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(3)}}(x_i) &= \\frac{f(x_i) - 3f(x_{i-1}) + 3f(x_{i-2}) - f(x_{i-3})}{h^3} \\\\
                f^{${`{\\prime}`.repeat(3)}}(${result.ans.x})&= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(3)}}(x)_{exact} - f^{${`{\\prime}`.repeat(3)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(3)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "central" && result.ans.error == "h^2") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Third Central Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^2`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(3)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(3)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(3)}}(x_i) &= \\frac{f(x_{i+2}) - 2f(x_{i+1}) + 2f(x_{i-1}) - f(x_{i-2})}{2h^3} \\\\
                f^{${`{\\prime}`.repeat(3)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(3)}}(x)_{exact} - f^{${`{\\prime}`.repeat(3)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(3)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "forward" && result.ans.error == "h^2") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Third Forward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^2`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(3)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(3)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>
            
              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(3)}}(x_i) &= \\frac{-3f(x_{i+4}) + 14f(x_{i+3}) - 24f(x_{i+2}) + 18f(x_{i+1}) - 5f(x_i)}{2h^3} \\\\
                f^{${`{\\prime}`.repeat(3)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(3)}}(x)_{exact} - f^{${`{\\prime}`.repeat(3)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(3)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "backward" && result.ans.error == "h^2") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Second Backward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^2`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(3)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(3)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(3)}}(x_i) &= \\frac{5f(x_i) - 18f(x_{i-1}) +24f(x_{i-2}) - 14f(x_{i-3}) + 3f(x_{i-3})}{2h^3} \\\\
                f^{${`{\\prime}`.repeat(3)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(3)}}(x)_{exact} - f^{${`{\\prime}`.repeat(3)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(3)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "central" && result.ans.error == "h^4") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Third Central Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^4`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(3)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(3)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(3)}}(x_i) &= \\frac{-f(x_{i+3}) + 8f(x_{i+2}) - 13f(x_{i+1}) + 13f(x_{i-1}) - 8f(x_{i-2}) + f(x_{i-3})}{8h^3} \\\\
                f^{${`{\\prime}`.repeat(3)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(3)}}(x)_{exact} - f^{${`{\\prime}`.repeat(3)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(3)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
        </>
      )}

      {/* Forth */}
      {result.ans?.order === 4 && (
        <>
          {(result.ans?.direction == "forward" && result.ans.error == "h") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Forth Forward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(4)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(4)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>
            
              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(4)}}(x_i) &= \\frac{f(x_{i+4}) - 4f(x_{i+3}) + 6f(x_{i+2}) - 4f(x_{i+1}) + f(x_i)}{h^4} \\\\
                f^{${`{\\prime}`.repeat(4)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(4)}}(x)_{exact} - f^{${`{\\prime}`.repeat(4)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(4)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "backward" && result.ans.error == "h") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Forth Backward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(4)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(4)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(4)}}(x_i) &= \\frac{f(x_i) - 4f(x_{i-1}) + 6f(x_{i-2}) - 4f(x_{i-3}) + f(x_{i-4})}{h^4} \\\\
                f^{${`{\\prime}`.repeat(4)}}(${result.ans.x})&= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(4)}}(x)_{exact} - f^{${`{\\prime}`.repeat(4)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(4)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "central" && result.ans.error == "h^2") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Forth Central Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^2`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(4)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(4)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(4)}}(x_i) &= \\frac{f(x_{i+2}) - 4f(x_{i+1}) + 6f(x_i) - 4f(x_{i-1}) + f(x_{i-2})}{h^4} \\\\
                f^{${`{\\prime}`.repeat(4)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(4)}}(x)_{exact} - f^{${`{\\prime}`.repeat(4)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(4)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "forward" && result.ans.error == "h^2") && ( 
            <>
              <div className="prose mx-auto text-center">
                <h4>Forth Forward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^2`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(4)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(4)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>
            
              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(4)}}(x_i) &= \\frac{-2f(x_{i+5}) + 11f(x_{i+4}) - 24f(x_{i+3}) + 26f(x_{i+2}) - 14f(x_{i+1}) + 3f(x_i)}{h^4} \\\\
                f^{${`{\\prime}`.repeat(4)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(4)}}(x)_{exact} - f^{${`{\\prime}`.repeat(4)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(4)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "backward" && result.ans.error == "h^2") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Forth Backward Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^2`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(4)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(4)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(4)}}(x_i) &= \\frac{3f(x_{i}) - 14f(x_{i-1}) + 26f(x_{i-2}) - 24f(x_{i-3}) + 11 f(x_{i-4}) - 2f(x_{i-5})}{h^4} \\\\
                f^{${`{\\prime}`.repeat(4)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(4)}}(x)_{exact} - f^{${`{\\prime}`.repeat(4)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(4)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
          {(result.ans?.direction == "central" && result.ans.error == "h^4") && (
            <>
              <div className="prose mx-auto text-center">
                <h4>Forth Central Divided-Differences</h4>
                <h4>Error Of Order <InlineMath math={`h^4`}/></h4>
              </div>

              <div className="flex gap-4 mx-auto">
                <p className="font-semibold">Exact differentiation:</p>
                <InlineMath math={`
                  f^{${`{\\prime}`.repeat(4)}}(x_{i}) = ${result.ans.exacDiff} \\\\
                  f^{${`{\\prime}`.repeat(4)}}(${result.ans.x}) = ${result.ans.exactValue}
                `}/>
              </div>

              <BlockMath math={`\\begin{align*}
                f^{${`{\\prime}`.repeat(4)}}(x_i) &= \\frac{-f(x_{i+3}) + 12f(x_{i+2}) - 39f(x_{i+1}) + 56f(x_{i}) - 39f(x_{i-1}) + 12f(x_{i-2}) - f(x_{i-3})}{6h^4} \\\\
                f^{${`{\\prime}`.repeat(4)}}(${result.ans.x}) &= ${result.ans.result}
              \\end{align*}`}/>

              <BlockMath math={`\\begin{align*}
                error = \\bigg| \\frac{f^{${`{\\prime}`.repeat(4)}}(x)_{exact} - f^{${`{\\prime}`.repeat(4)}}(x)_{approx}}{f^{${`{\\prime}`.repeat(4)}}(x)_{exact}} \\bigg| = ${result.ans.errorValue} \\%
              \\end{align*}`}/>
            </>
          )}
        </>
      )}
    </div>
  )
}
