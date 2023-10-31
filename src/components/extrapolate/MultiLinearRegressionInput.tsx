"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { MultiLinearForm } from "@/lib/solutions/extrapolation/MultiLinearRegression"
import { Minus, Plus } from "lucide-react"
import { BlockMath, InlineMath } from "react-katex"
import { Separator } from "../ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

interface MultiLinearRegressionInputProps {
  handleCalculate: (form: MultiLinearForm ,pointX: number[][], pointY: number[], targetX: number[]) => void
  question: MultiLinearForm[]
}

export default function MultiLinearRegressionInput({ handleCalculate, question }: MultiLinearRegressionInputProps) {
  const [nPoint, setNPoint] = useState(3);
  const [nPointX, setNPointX] = useState(1);
  const [form, setForm] = useState<MultiLinearForm>({
    pointX: Array.from({ length: nPoint }, () => Array(nPointX).fill("")),
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
    const pointX = form.pointX[0].map((_, colIndex) => form.pointX.map(row => Number(row[colIndex])));
    const pointY = form.pointY.map((Number));
    const targetX = form.targetX.map((Number))
    console.log(pointX)

    handleCalculate(form, pointX, pointY, targetX)
  }, [form, handleCalculate])

  const setSolution = (dataForm: MultiLinearForm) => {
    setForm(prevForm => ({
      ...prevForm,
      pointX: dataForm.pointX,
      pointY: dataForm.pointY,
      targetX: dataForm.targetX,
    }));
    setNPoint(dataForm.pointX.length)
    setNPointX(dataForm.targetX.length)
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

  const mappedQuestion = useMemo(() => {
    return question.map((data, index) => (
      <div key={index} className="w-full grid grid-cols-2 border rounded-md p-4">
        <div className="flex flex-col gap-1">
          <InlineMath math={`find \\\t x = (${data.targetX})`} />
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead><InlineMath math={`i`}/></TableHead>
                <TableHead><InlineMath math={`x_i`}/></TableHead>
                <TableHead><InlineMath math={`f(x_i)`}/></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.pointX.map((value, indexdata) => (
                <TableRow key={indexdata}>
                  <TableCell>{indexdata+1}</TableCell>
                  <TableCell>({value.join(",")})</TableCell>
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

  useEffect(() => {
    const newPointX = Array.from({ length: nPoint }, (_, i) =>
      Array.from({ length: nPointX }, (_, j) =>
        form.pointX[i] && form.pointX[i][j] ? form.pointX[i][j] : ""
      )
    );

    const newPointY = Array.from({ length: nPoint }, (_, i) =>
      form.pointY[i] ? form.pointY[i] : ""
    );

    const newTargetX = Array.from({ length: nPointX }, (_, i) =>
      form.targetX[i] ? form.targetX[i] : ""
    );

    if (
      nPoint !== form.pointX.length ||
      nPointX !== form.pointX[0].length ||
      nPoint != form.pointY.length ||
      nPointX != form.targetX.length
    ) {
      setForm((prevState) => ({
        ...prevState,
        pointX: newPointX,
        pointY: newPointY,
        targetX: newTargetX,
      }))
    }
    
  }, [nPoint, nPointX, form])

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

      <div className="max-w-full w-fit mx-auto flex gap-2 overflow-x-auto p-4">
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

      <div className="max-w-full w-fit flex gap-2 mx-auto bg-white border p-4 rounded-md shadow-md overflow-x-auto">
        <div className="flex flex-col">
          {form.pointX.map((row, indexRow) => (
            <div key={indexRow} className="flex mx-auto items-center gap-2 py-1">
              {row.map((value, indexCol) => (
                <Input
                  key={`x{${indexCol}${indexRow}}`}
                  type="number"
                  className="w-20"
                  placeholder={`x${indexCol}${indexRow}`}
                  value={value}
                  onChange={(e) => handlePointXChange(indexRow, indexCol, e.target.value)}
                />
              ))}
              <Separator className="h-8 bg-dark" orientation="vertical"/>
              <Input
                type="number"
                className="w-20"
                placeholder={`f(x${indexRow})`}
                value={form.pointY[indexRow]}
                onChange={(e) => handlePointYChange(indexRow, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
