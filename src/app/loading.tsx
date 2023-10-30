import { Loader2 } from "lucide-react"
import React from "react"

export default function loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 size={64} className="animate-spin text-primary"/>
    </div>
  )
}
