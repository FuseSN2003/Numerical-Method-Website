import PageLayout from "@/components/PageLayout";
import Lagrange from "./Lagrange";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Lagrange Interpolation",
  description: "Lagrange Interpolation | Numerical Methods",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function LagrangeInterpolationPage() {
  const question = await getQuestion("Lagrange Interpolation");

  return (
    <PageLayout title="Lagrange Interpolation">
      <Lagrange question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
