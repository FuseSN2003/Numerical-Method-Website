import Solutions from "@/lib/solutions/Solutions"
import { NextResponse } from "next/server";

export const GET = async (req: Request ) => {
  try {
    const question = await Solutions.getData("Graphical Method")
    console.log(question)

    return NextResponse.json(question);
  } catch (error) {
    console.log("Test")
  }
}