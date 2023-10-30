"use client"

import { useCallback, useMemo, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { InlineMath } from "react-katex";
import { SplineInputForm } from "@/lib/solutions/interpolation/SplineInterpolation";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";

interface SplineInterpolationInputProps {
  handleCalculate: (form: SplineInputForm, pointX: number[], pointY: number[], targetX: number, method: string) => void
  question: SplineInputForm[]
}

const selectMethod = [
  {label: "Linear Interpolation", value: "linear"},
  {label: "Quadratic Interpolation", value: "quadratic"},
  {label: "Cubic Interpolation", value: "cubic"},
]

export default function SplineInterpolationInput({ handleCalculate, question }: SplineInterpolationInputProps) {
  const [nPoint, setNPoint] = useState(3);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [form, setForm] = useState<SplineInputForm>({
    pointX: Array(nPoint).fill(''),
    pointY: Array(nPoint).fill(''),
    targetX: 0,
    method: "linear",
  })

  const handlePointXChange = (index: number, value: string) => {
    const newPointX = [...form.pointX];
    newPointX[index] = value;
    setForm((prevState) => ({ ...prevState, pointX: newPointX }))
  }

  const handlePointYChange = (index: number, value: string) => {
    const newPointY = [...form.pointY];
    newPointY[index] = value;
    setForm((prevState) => ({ ...prevState, pointY: newPointY }))
  }

  const increaseN = useCallback(() => {
      setNPoint((n) => n + 1);
  }, []);

  const decreaseN = useCallback(() => {
    if (nPoint > 3) {
      setNPoint((n) => n - 1);
    }
  }, [nPoint]);

  const calculate = useCallback(() => {
    const pointX = form.pointX.map(Number)
    const pointY = form.pointY.map(Number)

    if(!form.targetX) {
      setOpen(true);
      setAlertMessage("Please enter Target X");
      return;
    }
    
    handleCalculate(form, pointX, pointY, form.targetX, form.method);
  }, [form, handleCalculate])

  const setSolution = (dataForm: SplineInputForm) => {
    setNPoint(dataForm.pointX.length)
    setForm(dataForm);
    setOpenDialog(false);
  }

  const mappedQuestion = useMemo(() => {
    return question.map((data, index) => (
      <div key={index} className="w-full grid grid-cols-2 border rounded-md p-2">
        <div className="flex flex-col">
          <InlineMath math={`n = ${data.pointX.length}`} />
          <InlineMath math={`x = [${data.pointX}]`}/>
          <InlineMath math={`y = [${data.pointY}]`}/>
          <p><span className="font-semibold">Method</span>: {data.method}</p>
        </div>
        <div className="flex items-center justify-end">
          <Button onClick={() => setSolution(data)}>Set Solution</Button>
        </div>
      </div>
    ))
  }, [question])

  return (
    <>
      <div className="w-full max-w-xs mx-auto flex flex-col gap-6">
        <div className="flex items-end mx-auto w-full gap-2">
          <div>
            <Label htmlFor="nPoint">Number of Points</Label>
            <Input id="nPoint" min={1} type="number" value={nPoint} onChange={(e) => setNPoint(Number(e.target.value))} />
          </div>
          <div className="flex-grow flex gap-1">
            <Button className="w-full" onClick={decreaseN} variant={"destructive"}><Minus size={16}/></Button>
            <Button className="w-full" onClick={increaseN} variant="default"><Plus size={16}/></Button>
          </div>
        </div>
        <div className="w-full flex items-end mx-auto gap-2">
          <div>
            <Label>Target X</Label>
            <Input type="number" value={form.targetX} onChange={(e) => setForm((prevState) => ({ ...prevState, targetX: Number(e.target.value) }))}/>
          </div>
          <Button className="flex-grow" onClick={calculate}>Calculate</Button>
        </div>
        <div>
          <Select defaultValue="linear" value={form.method} onValueChange={(e) => setForm((prevState) => ({ ...prevState, method: e }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {selectMethod.map((data, index) => (
                <SelectItem key={index} value={data.value}>{data.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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

      <div className="w-fit mx-auto flex flex-col bg-white border p-4 rounded-md shadow-md">
        {Array.from({ length: nPoint }).map((_, i) => (
          <div key={i} className="flex items-center p-1 space-x-2">
            <p>{i + 1}.</p>
            <Input
              value={form.pointX[i]}
              placeholder={`x${i}`}
              type="number"
              onChange={(e) => handlePointXChange(i, e.target.value)}
            />
            <Input 
              value={form.pointY[i]}
              type="number"
              placeholder={`f(x${i})`}
              onChange={(e) => handlePointYChange(i, e.target.value)}
            />
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error!</DialogTitle>
            <DialogDescription>{alertMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
