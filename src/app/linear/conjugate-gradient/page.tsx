import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";
import ConjugateGradient from "./ConjugateGradient";

export const metadata: Metadata = {
  title: "Conjugate Gradient Method",
  description: "Conjugate Gradient Method | Numerical Methods",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function ConjugateGradientPage() {
  const question = await getQuestion("Conjugate Gradient");
  
  return (
    <PageLayout title="Conjugate Gradient Method">
      <ConjugateGradient question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
