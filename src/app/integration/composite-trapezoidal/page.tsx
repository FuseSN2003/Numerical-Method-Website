import PageLayout from "@/components/PageLayout";
import CompositeTrapzoidalRule from "./CompositeTrapzoidalRule";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Composite Trapezoidal Rule",
  description: "Composite Trapezoidal Rule | Numerical Methods",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function CompositeTrapezoidalRulePage() {
  const question = await getQuestion("Composite Integration");
  
  return (
    <PageLayout title="Composite Trapezoidal Rule">
      <CompositeTrapzoidalRule question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
