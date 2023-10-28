"use client"

import DisplayResult from "@/components/DisplayResult";
import ResultContainer from "@/components/ResultContainer";
import RootOfEquationGraph from "@/components/RootOfEquationGraph";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BisectionInput, BisectionResult } from "@/lib/solutions/rootOfEquation/BisectionMethod";
import { SecantInput, SecantResult } from "@/lib/solutions/rootOfEquation/SecantMethod";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { InlineMath } from "react-katex";

const initialForm = {
  fx: "",
  x0: 0,
  x1: 0,
  epsilon: 1e-6,
}

interface SecantProps {
  question: SecantInput[]
}

export default function Secant({ question }: SecantProps) {
  const [form, setForm] = useState<SecantInput>(initialForm);
  const [result, setResult] = useState<SecantResult>();
  const [alertDialog, setAlertDialog] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prevState) => ({ ...prevState, [id]: value }));
  }

  const cal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!form.fx) {
      setAlertDialog(true);
      setErrorMsg("f(x) is require");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/root/secant`, {
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

  const setSolution = (dataForm: SecantInput) => {
    setForm(dataForm);
    setOpenDialog(false);
  }

  const mappedQuestion = useMemo(() => {
    return question.map((data, index) => (
      <div key={index} className="w-full grid grid-cols-2 border rounded-md p-2">
        <div className="flex flex-col">
          <InlineMath math={`f(x) = ${data.fx}`}/>
          <InlineMath math={`x_{0} = ${data.x0}`}/>
          <InlineMath math={`x_{1} = ${data.x1}`}/>
          <InlineMath math={`epsilon(\\epsilon) = ${data.epsilon}`}/>
        </div>
        <div className="flex items-center justify-end">
          <Button onClick={() => setSolution(data)}>Set Solution</Button>
        </div>
      </div>
    ))
  }, [question])

  return (
    <>
      <div className="w-full max-w-2xl flex flex-col gap-8 mx-auto bg-white rounded-lg shadow-md p-8 border">
        <form onSubmit={cal} className="w-full flex flex-col gap-8">
          <div className="w-full grid items-center gap-1.5">
            <Label htmlFor="fx"><InlineMath math={`f(x)`}/></Label>
            <Input onChange={handleChange} type="text" id="fx" placeholder="x^4-13" value={form.fx}/>
          </div>
          <div className="grid md:grid-cols-3 w-full items-center gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="x0"><InlineMath math={`x_{0}`} /></Label>
              <Input onChange={handleChange} type="number" id="x0" value={form.x0} step="0.000001"/>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="x1"><InlineMath math={`x_{1}`} /></Label>
              <Input onChange={handleChange} type="number" id="x1" value={form.x1} step="0.000001"/>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="epsilon"><InlineMath math={`Epsilon (\\epsilon)`} /></Label>
              <Input onChange={handleChange} type="number" id="epsilon" value={form.epsilon} step="0.000001"/>
            </div>
          </div>
          <Button type="submit">Calculate</Button>
        </form>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger tabIndex={-1} asChild>
            <Button className="w-1/2 mx-auto" variant="ghost">Select Example Solution</Button>
          </DialogTrigger>
          <DialogContent className="h-[60dvh] p-8">
            <DialogHeader className="px-4">
              <DialogTitle>Select Solution</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col p-4 gap-2 overflow-y-auto">
              {mappedQuestion}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={alertDialog} onOpenChange={setAlertDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>
              {errorMsg}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <RootOfEquationGraph
        points={result?.ans?.points}
        ansPoint={result?.ans && [{x: result.ans.xi, y: result.ans.fxi}]}
        calPoints={result?.ans?.calPoints}
        loading={loading}
      />

      <Tabs defaultValue="solutions">
        <TabsList className="mb-2 grid grid-cols-2 w-40">
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>
        <ResultContainer loading={loading} result={result}>
          {result?.ans && (
            <>
              <TabsContent value="solutions" className="flex flex-col gap-8">
                <DisplayResult>
                  <h3 className="text-xl font-bold underline">Answer: </h3>
                  <p>Total iterations: {result.ans.iter}</p>
                  <InlineMath math={`x = ${result.ans.xi}`} />
                </DisplayResult>
                {result.ans.iterations.map((data, index) => (
                  data.iter <= 4 && (
                    <DisplayResult key={index}>
                      <h4 className="text-lg font-semibold">Iteration {data.iter}:</h4>
                      <InlineMath math={`x_{${data.iter-1}} = ${data.x0}`}/>
                      <InlineMath math={`x_{${data.iter}} = ${data.x1}`}/>
                      <InlineMath
                        math={`
                          x_{${data.iter+1}} = x_{${data.iter-1}} - \\frac{f(x_{${data.iter-1}})(x_{${data.iter-1}}-x_{${data.iter}})}{f(x_{${data.iter-1}})-f(x_{${data.iter}})}
                          = ${data.x0} - \\frac{(${data.fx0})(${data.x0}-${data.x1})}{${data.fx0}-${data.fx1}} 
                          = ${data.xi}
                        `}
                        />
                      <InlineMath
                        math={`
                          \\epsilon = \\left| x_{${data.iter-1}} - x_{${data.iter}} \\right| 
                          = \\left| ${data.x0} - ${data.x1} \\right| 
                          = ${data.tolerance}\\%
                        `}
                      />
                    </DisplayResult>
                  )
                ))}
              </TabsContent>
              <TabsContent value="table">
                <Table>
                  <TableCaption>Total iterations: {result.ans.iter}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead><InlineMath math={`Iteration`}/></TableHead>
                      <TableHead><InlineMath math={`x_{i}`}/></TableHead>
                      <TableHead><InlineMath math={`f(x_{i})`}/></TableHead>
                      <TableHead><InlineMath math={`tolerance(\\%)`}/></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.ans.iterations.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell><InlineMath math={`${data.iter}`}/></TableCell>
                        <TableCell><InlineMath math={`${data.xi}`}/></TableCell>
                        <TableCell><InlineMath math={`${data.fxi}`}/></TableCell>
                        <TableCell><InlineMath math={`${data.tolerance}\\%`}/></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </>
          )}
          {result?.error && (
            <p>{result.error}</p>
          )}
        </ResultContainer>
      </Tabs>
    </>
  );
}
