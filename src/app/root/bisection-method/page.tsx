import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import Bisection from "./Bisection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bisection Method",
  description: "Bisection Method | Numerical Methods",
};

export default async function BisectionMethodPage() {
  const data = await Solutions.getData("Bisection Method");
  
  return (
    <PageLayout title="Bisection Method">
      <Bisection question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
