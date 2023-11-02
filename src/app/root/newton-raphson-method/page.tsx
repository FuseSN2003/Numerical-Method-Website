import PageLayout from "@/components/PageLayout";
import NewtonRaphson from "./NewtonRaphson";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Newton-Raphson Method",
  description: "Newton-Raphson Method | Numerical Methods",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function NewtonRaphsonMethodPage() {
  const question = await getQuestion("Newton-Raphson Method");
  
  return (
    <PageLayout title="Newton-Raphson Method">
      <NewtonRaphson question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
