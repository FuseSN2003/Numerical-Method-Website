import PageLayout from "@/components/PageLayout";
import Regression from "./Regression";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Regression",
  description: "Regression | Numerical Methods",
};

export const dynamic = "force-dynamic";

export default async function RegressionPage() {
  const question = await getQuestion("Regression");
  
  return (
    <PageLayout title="Regression">
      <Regression question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
