import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";
import DifferentiationComponent from "./DifferentiationComponent";

export const metadata: Metadata = {
  title: "Differentiation",
  description: "Differentiation | Numerical Methods",
};

export const dynamic = "force-dynamic";

export default async function DifferentiationPage() {
  const question = await getQuestion("Differentiation");
  
  return (
    <PageLayout title="Differentiation">
      <DifferentiationComponent question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
