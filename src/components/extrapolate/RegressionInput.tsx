"use client"

import { RegressionForm } from "@/lib/solutions/extrapolation/Regression";
import { useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Minus, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { InlineMath } from "react-katex";
import { Separator } from "../ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface RegressionInputProps {
  question: RegressionForm[]
  handleCalculate: (form: RegressionForm, pointX: number[], pointY: number[], targetX: number, mOrder: number) => void
}

export default function RegressionInput({question, handleCalculate}: RegressionInputProps) {
  const [nPoint, setNPoint] = useState(3)
  const [form, setForm] = useState<RegressionForm>({
    pointX: Array(nPoint).fill(''),
    pointY: Array(nPoint).fill(''),
    targetX: '0',
    mOrder: '1',
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

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
    const pointX = form.pointX.map((Number));
    const pointY = form.pointY.map((Number));
    const targetX = Number(form.targetX);
    const mOrder = Number(form.mOrder);

    if(mOrder < 1) {
      setAlertMessage("m order must be at least 1")
      setOpen(true)
      return;
    }

    handleCalculate(form, pointX, pointY, targetX, mOrder)
  }, [form, handleCalculate])

  const mappedQuestion = useMemo(() => {
    return question.map((data, index) => (
      <div key={index} className="w-full grid grid-cols-2 border rounded-md p-4">
        <div className="flex flex-col gap-1">
          <InlineMath math={`n = ${data.pointX.length}`} />
          <InlineMath math={`m = ${data.mOrder}`} />
          <InlineMath math={`find \\\t x = ${data.targetX}`} />
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead><InlineMath math={`i`}/></TableHead>
                <TableHead><InlineMath math={`x_i`}/></TableHead>
                <TableHead><InlineMath math={`f(x_i)`}/></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({length: data.pointX.length}).map((_, indexdata) => (
                <TableRow key={indexdata}>
                  <TableCell>{indexdata+1}</TableCell>
                  <TableCell>{data.pointX[indexdata]}</TableCell>
                  <TableCell>{data.pointY[indexdata]}</TableCell>
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

  const setSolution = (dataForm: RegressionForm) => {
    setNPoint(dataForm.pointX.length)
    setForm(dataForm);
    setOpenDialog(false);
  }

  return (
    <>
      <div className="w-full max-w-xs mx-auto flex flex-col gap-6">
        <div className="w-full flex border items-end gap-1">
          <Button onClick={decreaseN} variant="destructive"><Minus size={16}/></Button>
          <div className="mx-auto">
            <Label htmlFor="nPoint">Number of Points</Label>
            <Input id="nPoint" type="number" min={1} value={nPoint} onChange={(e) => setNPoint(Number(e.target.value))} />
          </div>
          <Button className="bg-green-500 hover:bg-green-500/90" onClick={increaseN} variant="default"><Plus size={16}/></Button>
        </div>
        <div className="w-full flex items-end gap-4">
          <div className="w-full">
            <Label>m Order</Label>
            <Input type="number" min={1} value={form.mOrder} onChange={(e) => setForm((prevState) => ({ ...prevState, mOrder: e.target.value }))}/>
          </div>
          <div className="w-full">
            <Label>Target X</Label>
            <Input type="number" value={form.targetX} onChange={(e) => setForm((prevState) => ({ ...prevState, targetX: e.target.value }))}/>
          </div>
        </div>
        <Button onClick={calculate}>Calculate</Button>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger tabIndex={-1} asChild>
            <Button className="w-1/2 mx-auto" variant="ghost">Select Example Solution</Button>
          </DialogTrigger>
          <DialogContent className="h-[70dvh] p-8">
            <DialogHeader className="px-4">
              <DialogTitle>Select Solution</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col p-4 gap-2 overflow-y-auto">
              {mappedQuestion}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-fit mx-auto flex flex-col bg-white border p-6 rounded-md shadow-md">
        {Array.from({ length: nPoint }).map((_, i) => (
          <div key={i} className="flex items-center p-1 space-x-2">
            <p>{i + 1}.</p>
            <Input
              value={form.pointX[i]}
              placeholder={`x${i}`}
              onChange={(e) => handlePointXChange(i, e.target.value)}
            />
            <Separator className="h-8 bg-dark" orientation="vertical"/>
            <Input 
              value={form.pointY[i]}
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
  );
}
