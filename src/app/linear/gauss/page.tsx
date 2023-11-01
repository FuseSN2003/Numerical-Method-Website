import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";
import GaussElimination from "./GaussElimination";

export const metadata: Metadata = {
  title: "Gauss Elimination",
  description: "Gauss Elimination | Numerical Methods",
};

export const dynamic = "force-dynamic";

export default async function GaussEliminationPage() {
  const question = await getQuestion("Linear Algebra Equation");
  
  return (
    <PageLayout title="Gauss Elimination">
      <GaussElimination question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
