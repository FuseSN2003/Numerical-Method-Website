import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";
import MatrixInversion from "./MatrixInversion";

export const metadata: Metadata = {
  title: "Matrix Inversion",
  description: "Matrix Inversion | Numerical Methods",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function GaussEliminationPage() {
  const question = await getQuestion("Linear Algebra Equation");
  
  return (
    <PageLayout title="Matrix Inversion">
      <MatrixInversion question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
