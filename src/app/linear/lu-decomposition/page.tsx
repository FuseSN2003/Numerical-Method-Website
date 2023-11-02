import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";
import LUDecomposition from "./LUDecomposition";

export const metadata: Metadata = {
  title: "LU Decomposition Method",
  description: "LU Decomposition Method | Numerical Methods",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function GaussEliminationPage() {
  const question = await getQuestion("Linear Algebra Equation");
  
  return (
    <PageLayout title="LU Decomposition Method">
      <LUDecomposition question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
