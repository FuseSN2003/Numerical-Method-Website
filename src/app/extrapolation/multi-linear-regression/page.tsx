import PageLayout from "@/components/PageLayout";

import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";
import MultiLinearRegression from "./MultiLinearRegression";

export const metadata: Metadata = {
  title: "Multiple Linear Regression",
  description: "Regression | Numerical Methods",
};

export const dynamic = "force-dynamic";

export default async function RegressionPage() {
  const question = await getQuestion("Multiple Linear Regression");
  
  return (
    <PageLayout title="Multiple Linear Regression">
      <MultiLinearRegression question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
