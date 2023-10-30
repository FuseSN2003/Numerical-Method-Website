import Solutions from "@/lib/solutions/Solutions"
import { NextResponse } from "next/server"

export const GET = async (req: Request, { params: { method } }: any) => {
  
  try {
    const question = await Solutions.getData(method)

    return NextResponse.json(question, {status: 200})
  } catch (error) {
    console.log(error)
  }  
}