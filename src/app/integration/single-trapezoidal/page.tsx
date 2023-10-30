import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import { Metadata } from "next";
import SingleTrapezoidalRule from "./SingleTrapezoidalRule";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Single Trapezoidal Rule",
  description: "Single Trapezoidal Rule | Numerical Methods",
};

export const dynamic = "force-dynamic";

export default async function SingleTrapezoidalRulePage() {
  const question = await getQuestion("Single Integration");
  
  return (
    <PageLayout title="Single Trapezoidal Rule">
      <SingleTrapezoidalRule question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
