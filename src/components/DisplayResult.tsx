import React, { ReactNode } from "react"

interface DisplayResultProps {
  children: ReactNode
}

export default function DisplayResult({ children }: DisplayResultProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {children}
    </div>
  )
}
