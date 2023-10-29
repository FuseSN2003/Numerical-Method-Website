import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import { Metadata } from "next";
import SingleTrapezoidalRule from "./SingleTrapezoidalRule";

export const metadata: Metadata = {
  title: "Single Trapezoidal Rule",
  description: "Single Trapezoidal Rule | Numerical Methods",
};

export default async function SingleTrapezoidalRulePage() {
  const data = await Solutions.getData("Single Integration");
  
  return (
    <PageLayout title="Single Trapezoidal Rule">
      <SingleTrapezoidalRule question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
