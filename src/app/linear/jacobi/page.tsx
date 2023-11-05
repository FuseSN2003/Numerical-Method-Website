import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";
import JacobiIteration from "./JacobiIteration";

export const metadata: Metadata = {
  title: "Jacobi Iteration Method",
  description: "Jacobi Iteration Method | Numerical Methods",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function JacobiPage() {
  const question = await getQuestion("Linear Algebra Equation Iteration");
  
  return (
    <PageLayout title="Jacobi Iteration Method">
      <JacobiIteration question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
