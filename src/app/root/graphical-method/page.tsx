import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import Graphical from "./Graphical";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphical Method",
  description: "Graphical Method | Numerical Methods",
};

const fetchQuestion = async (method: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-question`, {
    method: "GET",
  })
  
  return res.json();
}

export default async function GraphicalMethodPage() {
  const data = await fetchQuestion("Graphical Method")
  return (
    <PageLayout title="Graphical Method">
      <Graphical question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
