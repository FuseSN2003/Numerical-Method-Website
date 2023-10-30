import PageLayout from "@/components/PageLayout";
import Secant from "./Secant";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Secant Method",
  description: "Secant | Numerical Methods",
};

export const dynamic = "force-dynamic";

export default async function SecantMethodPage() {
  const question = await getQuestion("Secant Method");
  
  return (
    <PageLayout title="Secant Method">
      <Secant question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
