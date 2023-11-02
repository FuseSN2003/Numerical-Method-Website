import { Loader2 } from "lucide-react"
import React from "react"

export default function loading() {
  return (
    <div className="w-full h-full py-10">
      <Loader2 size={64} className="animate-spin text-primary mx-auto"/>
    </div>
  )
}
