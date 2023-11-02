import PageLayout from "@/components/PageLayout";
import CompositeSimpsonRule from "./CompositeSimpsonRule";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Composite Simpson's Rule",
  description: "Composite Simpson's Rule | Numerical Methods",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function CompositeTrapezoidalRulePage() {
  const question = await getQuestion("Composite Integration");
  
  return (
    <PageLayout title="Composite Simpson's Rule">
      <CompositeSimpsonRule question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
