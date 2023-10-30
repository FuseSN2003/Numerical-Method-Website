import PageLayout from "@/components/PageLayout";
import FalsePosition from "./FalsePosition";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "False Position Method",
  description: "False Position Method | Numerical Methods",
};

export const dynamic = "force-dynamic";

export default async function FalsePositionMethodPage() {
  const question = await getQuestion("False Position Method")
  
  return (
    <PageLayout title="False Position Method">
      <FalsePosition question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
