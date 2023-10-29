import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import { Metadata } from "next";
import CompositeTrapzoidalRule from "./CompositeTrapzoidalRule";

export const metadata: Metadata = {
  title: "Composite Trapezoidal Rule",
  description: "Composite Trapezoidal Rule | Numerical Methods",
};

export default async function CompositeTrapezoidalRulePage() {
  const data = await Solutions.getData("Composite Integration");
  
  return (
    <PageLayout title="Composite Trapezoidal Rule">
      <CompositeTrapzoidalRule question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
