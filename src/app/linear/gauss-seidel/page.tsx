import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";
import GaussSeidel from "./GaussSeidel";

export const metadata: Metadata = {
  title: "Gauss Seidel Iteration Method Method",
  description: "Gauss Seidel Iteration Method | Numerical Methods",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function GaussSeidelIterationPage() {
  const question = await getQuestion("Linear Algebra Equation Iteration");
  
  return (
    <PageLayout title="Gauss Seidel Iteration Method">
      <GaussSeidel question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
