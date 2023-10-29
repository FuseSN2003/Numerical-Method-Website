"use client"

import { useCallback, useMemo, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { InterpolationForm } from "@/lib/solutions/interpolation/Interpolation";
import { InlineMath } from "react-katex";

interface InterpolationInputProps {
  handleCalculate: (form: InterpolationForm, pointX: number[], pointY: number[], targetX: number) => void
  question: InterpolationForm[]
}

export default function InterpolationInput({ handleCalculate, question }: InterpolationInputProps) {
  const [nPoint, setNPoint] = useState(3);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [form, setForm] = useState<InterpolationForm>({
    pointX: Array(nPoint).fill(''),
    pointY: Array(nPoint).fill(''),
    targetX: 0,
    selectedPoint: Array(nPoint).fill(false),
  })

  const handleCheckboxChange = (index: number) => {
    const newSelectedPoint = [...form.selectedPoint];
    newSelectedPoint[index] = !newSelectedPoint[index];
    setForm(prevForm => ({ ...prevForm, selectedPoint: newSelectedPoint }));
  }

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
    const selectedPointX = form.pointX.filter((_, index) => form.selectedPoint[index]).map((value) => Number(value));;
    const selectedPointY = form.pointY.filter((_, index) => form.selectedPoint[index]).map((value) => Number(value));;

    if(!form.targetX) {
      setOpen(true);
      setAlertMessage("Please enter Target X");
      return;
    }

    if(selectedPointX.length < 2) {
      setOpen(true)
      setAlertMessage("Please check point at least 2 points")
      return;
    }
    
    handleCalculate(form, selectedPointX, selectedPointY, form.targetX)
  }, [form.pointX, form.pointY, form.selectedPoint, form.targetX, handleCalculate])

  const setSolution = (dataForm: InterpolationForm) => {
    setNPoint(dataForm.pointX.length)
    setForm(dataForm);
    setOpenDialog(false);
  }

  const mappedQuestion = useMemo(() => {
    return question.map((data, index) => (
      <div key={index} className="w-full grid grid-cols-2 border rounded-md p-2">
        <div className="flex flex-col">
          <InlineMath math={`x = [${data.pointX}]`}/>
          <InlineMath math={`y = [${data.pointY}]`}/>
          <InlineMath math={`n = ${data.pointX.length}`} />
          {data.selectedPoint.map((value, index) => (
            <InlineMath key={index} math={`x_{${index}} = ${value}`} />
          ))}
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
        <div className="w-full flex items-end gap-4">
          <Button onClick={decreaseN} variant={"destructive"}><Minus size={16}/></Button>
          <div>
            <Label htmlFor="nPoint">Number of Points</Label>
            <Input id="nPoint" type="number" value={nPoint} onChange={(e) => setNPoint(Number(e.target.value))} />
          </div>
          <Button onClick={increaseN} variant="default"><Plus size={16}/></Button>
        </div>
        <div className="w-full flex items-end gap-4">
          <div className="w-full">
            <Label>Target X</Label>
            <Input type="number" value={form.targetX} onChange={(e) => setForm((prevState) => ({ ...prevState, targetX: Number(e.target.value) }))}/>
          </div>
          <Button onClick={calculate}>Calculate</Button>
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
            <Checkbox
              checked={form.selectedPoint[i]}
              tabIndex={-1}
              onCheckedChange={() => handleCheckboxChange(i)}
            />
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
