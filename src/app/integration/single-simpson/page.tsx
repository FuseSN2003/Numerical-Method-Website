import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import { Metadata } from "next";
import SingleSimpsonRule from "./SingleSimpsonRule";

export const metadata: Metadata = {
  title: "Single Simpson's Rule",
  description: "Single Simpson's Rule | Numerical Methods",
};

export default async function SingleTrapezoidalRulePage() {
  const data = await Solutions.getData("Single Integration");
  
  return (
    <PageLayout title="Single Simpson's Rule">
      <SingleSimpsonRule question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
