import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import Lagrange from "./Lagrange";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lagrange Interpolation",
  description: "Lagrange Interpolation | Numerical Methods",
};

export default async function LagrangeInterpolationPage() {
  const data = await Solutions.getData("Lagrange Interpolation");
  return (
    <PageLayout title="Lagrange Interpolation">
      <Lagrange question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
