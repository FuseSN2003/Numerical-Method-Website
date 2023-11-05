import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";
import CholeskyDecomposition from "./CholeskyDecomposition";

export const metadata: Metadata = {
  title: "Cholesky Decomposition Method",
  description: "Cholesky Decomposition Method | Numerical Methods",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function CholeskyPage() {
  const question = await getQuestion("Linear Algebra Equation");
  
  return (
    <PageLayout title="Cholesky Decomposition Method">
      <CholeskyDecomposition question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
