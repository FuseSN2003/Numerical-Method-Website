import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import NewtonRaphson from "./NewtonRaphson";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newton-Raphson Method",
  description: "Newton-Raphson Method | Numerical Methods",
};

export default async function BisectionMethodPage() {
  const data = await Solutions.getData("Newton-Raphson Method");
  
  return (
    <PageLayout title="Newton-Raphson Method">
      <NewtonRaphson question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
