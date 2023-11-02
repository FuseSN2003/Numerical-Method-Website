import PageLayout from "@/components/PageLayout";
import Graphical from "./Graphical";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Graphical Method",
  description: "Graphical Method | Numerical Methods",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function GraphicalMethodPage() {
  const question = await getQuestion("Graphical Method");

  return (
    <PageLayout title="Graphical Method">
      <Graphical question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
