import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import OnePointIterationMethod from "./OnePointIteration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "One-Point Iteration Method",
  description: "One-Point Iteration Method | Numerical Methods",
};

export default async function OnePointIterationMethodPage() {
  const data = await Solutions.getData("One-Point Iteration Method");
  
  return (
    <PageLayout title="One-Point Iteration Method">
      <OnePointIterationMethod question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
