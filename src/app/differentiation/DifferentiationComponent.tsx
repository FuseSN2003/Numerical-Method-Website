"use client"

import DisplayResult from "@/components/DisplayResult"
import ResultContainer from "@/components/ResultContainer"
import DisplayDiff from "@/components/diff/DisplayDiff"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DiffResult } from "@/lib/solutions/differentiation/Differentiation"
import { re } from "mathjs"
import { useRouter } from "next/navigation"
import React, { ChangeEvent, useEffect, useMemo, useState } from "react"
import { BlockMath, InlineMath } from "react-katex"

interface DifferentiationProps {
  question: any
}

const orderOptions = [
  { label: "First", value: "1"},
  { label: "Second", value: "2" },
  { label: "Third", value: "3" },
  { label: "Forth", value: "4" },
]


const directionOptions = [
  { label: "Forward", value: "forward"},
  { label: "Backward", value: "backward" },
  { label: "Central", value: "central" },
]

const errorOptions = [
  { label: "O(h)", value: "h" },
  { label: "O(h^2)", value: "h^2" },
  { label: "O(h^4)", value: "h^4" },
]

export default function DifferentiationComponent({ question }: DifferentiationProps) {
  const [form, setForm] = useState({
    order: "",
    direction: "",
    error: "",
    fx: "",
    x: "",
    h: "",
  });
  const [result, setResult] = useState<DiffResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setForm((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleCalculate = async () => {
    if(!form.fx) {
      setErrorMsg("f(x) is require");
      setOpenErrorDialog(true);
      return;
    }

    if((form.direction !== "central" && form.error === "h^4") || (form.direction === "central" && form.error === "h")) {
      setErrorMsg("Invalid input");
      setOpenErrorDialog(true);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/diff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
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

  const setSolution = (dataForm: any) => {
    setForm(dataForm);
    setOpenDialog(false);
  }

  const mappedQuestion = useMemo(() => {
    return question.map((data:any, index:number) => (
      <div key={index} className="w-full grid grid-cols-2 border rounded-md p-2">
        <div className="flex flex-col">
          <InlineMath math={`f(x) = ${data.fx}`}/>
          <InlineMath math={`order = ${data.order}`}/>
          <InlineMath math={`direction = ${data.direction}`}/>
          <InlineMath math={`error = O(${data.error})`}/>
          <InlineMath math={`x = ${data.x}`}/>
          <InlineMath math={`h = ${data.h}`}/>
        </div>
        <div className="flex items-center justify-end">
          <Button onClick={() => setSolution(data)}>Set Solution</Button>
        </div>
      </div>
    ))
  }, [question])

  return (
    <>
      <div className="w-full max-w-lg flex flex-col gap-8 mx-auto bg-white rounded-lg shadow-md p-8 border">
        <div>
          <Label><InlineMath math={`f(x)`}/></Label>
          <Input placeholder="e^x" value={form.fx} onChange={(e) => setForm((prevState) => ({ ...prevState, fx: e.target.value }))}/>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between gap-4 items-end">
          <div className="w-full">
            <Label>Order</Label>
            <Select value={form.order} onValueChange={(e) => setForm((prevState) => ({ ...prevState, order: e }))} >
              <SelectTrigger>
                <SelectValue placeholder="-"/>
              </SelectTrigger>
              <SelectContent>
                {orderOptions.map((data, index) => (
                  <SelectItem key={index} value={data.value}>{data.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Label>Direction</Label>
            <Select value={form.direction} onValueChange={(e) => setForm((prevState) => ({ ...prevState, direction: e }))}>
              <SelectTrigger>
                <SelectValue placeholder="-"/>
              </SelectTrigger>
              <SelectContent>
                {directionOptions.map((data, index) => (
                  <SelectItem key={index} value={data.value}>{data.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Label>Error</Label>
            <Select value={form.error} onValueChange={(e) => setForm((prevState) => ({ ...prevState, error: e }))}>
              <SelectTrigger>
                <SelectValue placeholder="-" />
              </SelectTrigger>
              <SelectContent>
                {errorOptions.map((data, index) => (
                  <SelectItem key={index} value={data.value}>{data.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between gap-4 items-end">
          <div className="w-full">
            <Label><InlineMath math={`x`}/></Label>
            <Input onChange={handleChange} value={form.x} type="number" id="x"/>
          </div>
          <div className="w-full">
            <Label><InlineMath math={`h`}/></Label>
            <Input onChange={handleChange} value={form.h} type="number" id="h"/>
          </div>
          <div className="w-full">
            <Button className="w-full mx-auto" size="lg" onClick={handleCalculate}>Calculate</Button>
          </div>
        </div>
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

      <Dialog open={openErrorDialog} onOpenChange={setOpenErrorDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error!</DialogTitle>
            <DialogDescription>{errorMsg}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <ResultContainer result={result} loading={loading}>
        {result?.ans && (
          <DisplayResult>
            <DisplayDiff result={result}/>
          </DisplayResult>
        )}
      </ResultContainer>
    </>
  )
}
