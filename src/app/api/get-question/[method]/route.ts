import Solutions from "@/lib/solutions/Solutions"
import { NextResponse } from "next/server"

export const GET = async(req: Request, { params: { method }}: any) => {
  try {
    const data = await Solutions.getData(method)
    
    return NextResponse.json(data);
  } catch (error) {
    console.log(error)
  }
}