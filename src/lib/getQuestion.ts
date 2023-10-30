export async function getQuestion(method: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-question/${method}`)
    return res.json()
  } catch (error) {
    console.log("Failed to get question")
  }
}