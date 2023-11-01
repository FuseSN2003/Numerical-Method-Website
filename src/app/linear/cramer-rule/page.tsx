import PageLayout from "@/components/PageLayout";
import Cramer from "./Cramer";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cramer's Rule",
  description: "Cramer's Rule | Numerical Methods",
};

export const dynamic = "force-dynamic";

export default async function CramerRulePage() {
  const question = await getQuestion("Linear Equation");
  
  return (
    <PageLayout title="Cramer's Rule">
      <Cramer question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
