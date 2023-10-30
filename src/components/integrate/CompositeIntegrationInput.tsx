"use client"

import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { InlineMath } from "react-katex";
import { Button } from "../ui/button";
import { CompositeIntegrationForm } from "@/lib/solutions/integration/Integration";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

const intialForm = {
  fx: "",
  a: 0,
  b: 0,
  n: 0,
}

interface CompositeIntegrationInputProps {
  cal: (form: CompositeIntegrationForm) => void;
  question: CompositeIntegrationForm[]
}

export default function CompositeIntegrationInput({ cal, question }: CompositeIntegrationInputProps) {
  const [form, setForm] = useState<CompositeIntegrationForm>(intialForm);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setForm((prevState) => ({...prevState, [id]: value }))
  }

  const handleCal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    cal(form);
  }

  const setSolution = (dataForm: CompositeIntegrationForm) => {
    setForm(dataForm);
    setOpenDialog(false);
  }

  const mappedQuestion = useMemo(() => {
    return question.map((data, index) => (
      <div key={index} className="w-full grid grid-cols-1 gap-4 border rounded-md p-4">
        <div className="flex flex-col">
          <InlineMath math={`\\int_{${data.a}}^{${data.b}}${data.fx}\\\tdx`}/>
          <InlineMath math={`n = ${data.n}`} />
        </div>
        <div className="flex justify-center">
          <Button onClick={() => setSolution(data)}>Set Solution</Button>
        </div>
      </div>
    ))
  }, [question])
  
  return (
    <>
      <form onSubmit={handleCal} className="w-full mx-auto max-w-2xl flex flex-col gap-8 border p-8 bg-white rounded-lg shadow-md">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="fx"><InlineMath math={`f(x)`} /></Label>
          <Input onChange={handleChange} type="text" id="fx" placeholder="4x^5-3x^4+x^3-6x+2" value={form.fx} />
        </div>
        <div className="grid md:grid-cols-3 w-full items-center gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="a"><InlineMath math={`a`} /></Label>
            <Input onChange={handleChange} type="number" id="a" step="0.000001" placeholder="a" value={form.a}  />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="b"><InlineMath math={`b`} /></Label>
            <Input onChange={handleChange} type="number" id="b" step="0.000001" placeholder="b" value={form.b} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="n"><InlineMath math={`n`} /></Label>
            <Input onChange={handleChange} type="number" id="n" step="0.000001" placeholder="n" value={form.n} />
          </div>
        </div>
        <Button type="submit" className="w-full">Calculate</Button>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger tabIndex={-1} asChild>
            <Button className="w-1/2 mx-auto" variant="ghost">Select Example Solution</Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-xl h-[60dvh] p-8">
            <DialogHeader className="px-4">
              <DialogTitle>Select Solution</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col p-4 gap-2 overflow-y-auto">
              {mappedQuestion}
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </>
  )
}
