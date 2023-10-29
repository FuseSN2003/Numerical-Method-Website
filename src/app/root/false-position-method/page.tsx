import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import FalsePosition from "./FalsePosition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "False Position Method",
  description: "False Position Method | Numerical Methods",
};

export default async function FalsePositionMethodPage() {
  const data = await Solutions.getData("False Position Method");
  
  return (
    <PageLayout title="False Position Method">
      <FalsePosition question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
