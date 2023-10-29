import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import Graphical from "./Graphical";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphical Method",
  description: "Graphical Method | Numerical Methods",
};

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-question`, {
    next: {
      revalidate: 10,
    }
  })

  return res.json();
}

export default async function GraphicalMethodPage() {
  // const data = await Solutions.getData("Graphical Method");
  const data = await getData();
  return (
    <PageLayout title="Graphical Method">
      <Graphical question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
