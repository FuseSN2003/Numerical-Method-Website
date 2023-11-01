"use client"

import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

interface MatrixInputProps {
  handleCalculate: (form: any, matrixA: number[][], matrixB: number[]) => void
}

export default function MatrixInput({ handleCalculate }: MatrixInputProps) {
  const [matrixSize, setMatrixSize] = useState(3);
  const [form, setForm] = useState({
    matrixA: Array.from({ length: matrixSize }, () => Array(matrixSize).fill("")),
    matrixB: Array(matrixSize).fill(''),
  });

  const handleChangeSize = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value)
    if(value < 2) {
      value = 2;
    };
    setMatrixSize(value)
  }, [])

  const increaseSize = useCallback(() => {
    setMatrixSize((prevSize) => prevSize + 1);
  }, [matrixSize])

  const decreaseSize = useCallback(() => {
    if(matrixSize > 2) {
      setMatrixSize((prevSize) => prevSize - 1);
    }
  }, [matrixSize])

  const handleMatrixAChange = useCallback((e: ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const newVal = e.target.value;
    const updatedMatrix = [...form.matrixA];
    updatedMatrix[row][col] = newVal;
    setForm((prevState) => ({ ...prevState, matrixA: updatedMatrix}))
  }, [form.matrixA])

  const handleMatrixBChange = useCallback((e: ChangeEvent<HTMLInputElement>, row: number) => {
    const newVal = e.target.value;
    const updatedMatrix = [...form.matrixB];
    updatedMatrix[row] = newVal;
    setForm((prevState) => ({ ...prevState, matrixB: updatedMatrix}))
  }, [form.matrixB])

  const calculate = useCallback(() => {
    const matrixA = form.matrixA.map((row) => row.map(Number));
    const matrixB = form.matrixB.map(Number);

    handleCalculate(form, matrixA, matrixB)
  }, [form])


  useEffect(() => {
    const newMatrixA = Array.from({ length: matrixSize }, (_, i) =>
      Array.from({ length: matrixSize }, (_, j) =>
        form.matrixA[i] && form.matrixA[i][j] ? form.matrixA[i][j] : ""
      )
    );

    const newMatrixB = Array.from({ length: matrixSize }, (_, i) =>
      form.matrixB[i] ? form.matrixB[i] : ""
    );
    
    if (
      matrixSize !== form.matrixA.length ||
      matrixSize !== form.matrixB.length
    ) {
      setForm((prevState) => ({
        ...prevState,
        matrixA: newMatrixA,
        matrixB: newMatrixB,
      }))
    }
  }, [matrixSize, form]);

  return (
    <>
      <div className="mx-auto flex items-end gap-2">
        <Button onClick={decreaseSize} variant={"destructive"}><Minus /></Button>
        <div className="flex flex-col gap-2">
          <Label>Matrix size (NxN)</Label>
          <Input
            value={matrixSize}
            type="number"
            min={2}
            onChange={handleChangeSize}
          />
        </div>
        <Button onClick={increaseSize} variant={"default"} className="bg-green-500 hover:bg-green-500/90"><Plus /></Button>
      </div>

      <div className="max-w-full w-fit mx-auto flex gap-2 overflow-x-auto p-2">
        <div className="flex flex-col gap-2">
          <Label className="mx-auto">{`[A]`}</Label>
          <div
            className="grid auto-cols-auto gap-1"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${matrixSize}, 5rem)`,
            }}
          >
            {form.matrixA.map((row, indexRow) => (
              row.map((value, indexCol) => (
                <Input
                  key={`${indexRow}${indexCol}`}
                  className="h-20 w-20 text-center"
                  placeholder={`a${indexRow+1}${indexCol+1}`}
                  value={value}
                  onChange={(e) => handleMatrixAChange(e, indexRow, indexCol)}
                />
              ))
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="mx-auto">{`{X}`}</Label>
          <div className="flex flex-col gap-1">
            {Array.from({ length: matrixSize }).map((_, index) => (
              <Input
                key={`${index}`}
                className="h-20 w-20 text-center"
                placeholder={`x${index+1}`}
                disabled
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-xl">=</p>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="mx-auto">{`{B}`}</Label>
          <div className="flex flex-col gap-1">
            {form.matrixB.map((value, index) => (
              <Input
                key={`${index}`}
                className="h-20 w-20 text-center"
                placeholder={`b${index+1}`}
                value={value}
                onChange={(e) => handleMatrixBChange(e, index)}
              />
            ))}
          </div>
        </div>
      </div>

      <Button onClick={calculate} className="max-w-xs w-full mx-auto">Calculate</Button>
    </>
  )
}
