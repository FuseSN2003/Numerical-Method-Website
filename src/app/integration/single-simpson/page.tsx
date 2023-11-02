import PageLayout from "@/components/PageLayout";
import SingleSimpsonRule from "./SingleSimpsonRule";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Single Simpson's Rule",
  description: "Single Simpson's Rule | Numerical Methods",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function SingleTrapezoidalRulePage() {
  const question = await getQuestion("Single Integration");
  
  return (
    <PageLayout title="Single Simpson's Rule">
      <SingleSimpsonRule question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
