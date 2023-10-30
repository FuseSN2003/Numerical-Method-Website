"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { MultiLinearForm } from "@/lib/solutions/extrapolation/MultiLinearRegression"
import { Minus, Plus } from "lucide-react"
import { InlineMath } from "react-katex"
import { Separator } from "../ui/separator"

interface MultiLinearRegressionInputProps {
  handleCalculate: (form: MultiLinearForm ,pointX: number[][], pointY: number[], targetX: number[]) => void
  question: MultiLinearForm[]
}

export default function MultiLinearRegressionInput({ handleCalculate, question }: MultiLinearRegressionInputProps) {
  const [nPoint, setNPoint] = useState(3);
  const [nPointX, setNPointX] = useState(1);
  const [form, setForm] = useState<MultiLinearForm>({
    pointX: Array.from({ length: nPointX }, () => Array(nPoint).fill("")),
    pointY: Array(nPoint).fill(''),
    targetX: Array(nPointX).fill(''),
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handlePointXChange = (row: number, col: number, value: string) => {
    const newPointX = [...form.pointX]
    newPointX[row][col] = value;
    setForm((prevState) => ({...prevState, pointX: newPointX}))
  }

  const handlePointYChange = (index: number, value: string) => {
    const newPointY = [...form.pointY];
    newPointY[index] = value;
    setForm((prevState) => ({ ...prevState, pointY: newPointY }))
  }

  const handleTargetXChange = (index: number, value: string) => {
    const newTargetX = [...form.targetX];
    newTargetX[index] = value;
    setForm((prevState) => ({ ...prevState, targetX: newTargetX }))
  }

  const calculate = useCallback(() => {

    const pointX = form.pointX.map((row) => row.map(Number))
    const pointY = form.pointY.map((Number));
    const targetX = form.targetX.map((Number))

    handleCalculate(form, pointX, pointY, targetX)
  }, [form, handleCalculate])

  const setSolution = (dataForm: MultiLinearForm) => {
    setNPoint(dataForm.pointY.length)
    setNPointX(dataForm.targetX.length)
    setForm(prevForm => ({
      ...prevForm,
      pointX: dataForm.pointX,
      pointY: dataForm.pointY,
      targetX: dataForm.targetX,
    }));
    setOpenDialog(false);
  }

  const increaseN = useCallback(() => {
    setNPoint((n) => n + 1);
  }, []);

  const decreaseN = useCallback(() => {
    if (nPoint > 3) {
      setNPoint((n) => n - 1);
    }
  }, [nPoint]);

  useEffect(() => {
    setForm((prevState) => {
      // Clone the current pointX array
      const newPointX = prevState.pointX.map(row => [...row]);

      // Clone the current pointY and targetX arrays
      const newPointY = [...prevState.pointY];
      const newTargetX = [...prevState.targetX];

      // Resize the newPointX array to have the desired length
      if (newPointX.length > nPointX) {
        newPointX.length = nPointX;
      } else {
        while (newPointX.length < nPointX) {
          newPointX.push(Array(nPoint).fill(''));
        }
      }

      // Resize the newPointY and newTargetX arrays to have the desired length
      newPointY.length = nPoint;
      newTargetX.length = nPointX;

      // Return the updated state
      return {
        ...prevState,
        pointX: newPointX,
        pointY: newPointY,
        targetX: newTargetX,
      };
    });
  }, [nPoint, nPointX]);

  const mappedQuestion = useMemo(() => {
    return question.map((data, index) => (
      <div key={index} className="w-full grid grid-cols-2 border rounded-md p-2">
        <div className="flex flex-col gap-1">
          <p><InlineMath math="x ="/> {data.pointX.map((row) => `[${row.map((value) => value)}]`)}</p>
          <p><InlineMath math="y ="/> {data.pointY.map((value) => value)}</p>
        </div>
        <div className="flex items-center justify-end">
          <Button onClick={() => setSolution(data)}>Set Solution</Button>
        </div>
      </div>
    ))
  }, [question])

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger tabIndex={-1} asChild>
          <Button className="mx-auto" variant="ghost">Select Example Solution</Button>
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
            <Label>Number of Points X</Label>
            <Input type="number" min={1} value={nPointX} onChange={(e) => setNPointX(Number(e.target.value))}/>
          </div>
          <Button className="flex-grow" onClick={calculate}>Calculate</Button>
        </div>
      </div>

      <div className="max-w-full w-fit mx-auto flex gap-2">
        {Array.from({ length: nPointX }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            <Label><InlineMath math={`x_{${i}}`}/></Label>
            <Input
              className="w-20"
              onChange={(e) => handleTargetXChange(i, e.target.value)}
              value={form.targetX[i]}
            />
          </div>
        ))}
      </div>

      <div className="max-w-full w-fit mx-auto flex flex-col bg-white border p-6 rounded-md shadow-md overflow-x-auto">
        {Array.from({ length: nPoint }, (_, row) =>
          <div key={row} className="flex items-center gap-2 py-1">
            <span>{row + 1}.</span>
            {Array.from({ length: nPointX }, (_, col) => (
              <Input
                placeholder={`x${col}${row}`}
                className="w-20"
                key={`${col}${row}`}
                value={form.pointX[col][row]}
                onChange={(e) => handlePointXChange(col, row, e.target.value)}
              />
            ))}
            <Separator className="h-8 bg-dark" orientation="vertical" />
            <Input
              className="w-20"
              placeholder={`f(x${row})`}
              value={form.pointY[row]}
              onChange={(e) => handlePointYChange(row, e.target.value)}
            />
          </div>
        )}
      </div>
    </>
  )
}
