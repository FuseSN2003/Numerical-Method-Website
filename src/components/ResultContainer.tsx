import { Loader2 } from "lucide-react";
import React, { ReactNode } from "react";

interface ResultContainerProps {
  children: ReactNode
  loading: boolean
  result: any
}

export default function ResultContainer({ children, loading, result }: ResultContainerProps) {
  return (
    <div className="flex flex-col gap-8 border bg-white px-12 py-10 rounded-lg shadow-md">
      {loading ? (
        <div className="w-full flex justify-center">
          <Loader2 size={48} className="animate-spin text-primary"/>
        </div>
      ) : (
        result ? (
          children
        ) : (
          <p className="w-full text-center text-dark">Enter solution</p>
        )
      )}
    </div>
  )
}
