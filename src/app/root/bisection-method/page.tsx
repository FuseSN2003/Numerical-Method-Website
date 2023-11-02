import PageLayout from "@/components/PageLayout";
import Bisection from "./Bisection";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bisection Method",
  description: "Bisection Method | Numerical Methods",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function BisectionMethodPage() {
  const question = await getQuestion("Bisection Method");
  
  return (
    <PageLayout title="Bisection Method">
      <Bisection question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
