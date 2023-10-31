"use client"

import { useCallback, useMemo, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { InterpolationForm } from "@/lib/solutions/interpolation/Interpolation";
import { InlineMath } from "react-katex";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

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
  }, [form, handleCalculate])

  const setSolution = (dataForm: InterpolationForm) => {
    setNPoint(dataForm.pointX.length)
    setForm(dataForm);
    setOpenDialog(false);
  }

  const mappedQuestion = useMemo(() => {
    return question.map((data, index) => (
      <div key={index} className="w-full grid grid-cols-2 border rounded-md p-2">
        <div className="flex flex-col gap-2">
          <InlineMath math={`n = ${data.pointX.length}`} />
          <p className="font-bold">Points</p>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead><InlineMath math={`i`}/></TableHead>
                <TableHead><InlineMath math={`x_i`}/></TableHead>
                <TableHead><InlineMath math={`f(x_i)`}/></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.selectedPoint.map((value, index) => (
                <TableRow key={index} className={`${value ? "bg-green-100" : "bg-white"}`}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{data.pointX[index]}</TableCell>
                  <TableCell>{data.pointY[index]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

      <div className="w-full max-w-md mx-auto flex flex-col bg-white border p-4 rounded-md shadow-md">
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
