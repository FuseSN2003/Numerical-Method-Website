import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import Graphical from "./Graphical";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphical Method",
  description: "Graphical Method | Numerical Methods",
};

export default async function GraphicalMethodPage() {
  const data = await Solutions.getData("Graphical Method");

  return (
    <PageLayout title="Graphical Method">
      <Graphical question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
