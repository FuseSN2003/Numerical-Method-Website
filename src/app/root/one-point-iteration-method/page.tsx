import PageLayout from "@/components/PageLayout";
import OnePointIterationMethod from "./OnePointIteration";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "One-Point Iteration Method",
  description: "One-Point Iteration Method | Numerical Methods",
};

export const dynamic = "force-dynamic";

export default async function OnePointIterationMethodPage() {
  const question = await getQuestion("One-Point Iteration Method");
  
  return (
    <PageLayout title="One-Point Iteration Method">
      <OnePointIterationMethod question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
