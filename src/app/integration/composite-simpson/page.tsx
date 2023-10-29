import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import { Metadata } from "next";
import CompositeSimpsonRule from "./CompositeSimpsonRule";

export const metadata: Metadata = {
  title: "Composite Simpson's Rule",
  description: "Composite Simpson's Rule | Numerical Methods",
};

export default async function CompositeTrapezoidalRulePage() {
  const data = await Solutions.getData("Composite Integration");
  
  return (
    <PageLayout title="Composite Simpson's Rule">
      <CompositeSimpsonRule question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
