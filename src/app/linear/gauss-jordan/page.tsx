import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";
import GaussJordanElimination from "./GaussJordanElimination";

export const metadata: Metadata = {
  title: "Gauss-Jordan Elimination",
  description: "Gauss-Jordan Elimination | Numerical Methods",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function GaussEliminationPage() {
  const question = await getQuestion("Linear Algebra Equation");
  
  return (
    <PageLayout title="Gauss-Jordan Elimination">
      <GaussJordanElimination question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
