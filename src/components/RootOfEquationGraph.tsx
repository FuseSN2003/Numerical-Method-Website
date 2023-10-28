import React from "react";
import dynamic from "next/dynamic";
import { Point } from "@/types";
import { Loader2 } from "lucide-react";
const Plotly = dynamic(() => import("react-plotly.js"), { ssr: false, })

interface RootOfEquationGraphProps {
  points: Point[] | undefined
  ansPoint: Point[] | undefined
  loading: boolean
}

export default function RootOfEquationGraph({ points, loading, ansPoint }: RootOfEquationGraphProps) {
  return (
    <>
      <div className="w-full min-h-[450px] flex flex-col py-8 px-12 border rounded-lg shadow-md bg-white overflow-x-auto">
        <h3 className="text-xl font-bold">Graph</h3>
        {loading ? (
          <div className="w-full min-h-[450px] flex items-center justify-center">
            <Loader2 size={48} className="animate-spin text-primary"/>
          </div>
        ) : (
          <Plotly
            data={[
              {
                x: points?.map((value) => value.x),
                y: points?.map((value) => value.y),
                mode: "lines+markers",
                line: { color: "red" },
                marker: { color: "blue" },
                name: "f(x)",
                transforms: [
                  {
                    type: "sort",
                  }
                ]
              },
              {
                x: ansPoint?.map((value) => value.x),
                y: ansPoint?.map((value) => value.y),
                mode: "markers",
                name: "Root x",
                marker: { color: "green", size: 16 }
              }
            ]}
            config={{
              scrollZoom: true,
            }}
            layout={{
              width: 1024,
              height: 450,
              dragmode: "pan",
              showlegend: true,
              legend: {
                x: 1,
                y: 0.5,
              }
            }}
            className="mx-auto"
          />
        )}
      </div>
    </>
  );
}
