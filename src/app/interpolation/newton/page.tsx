import PageLayout from "@/components/PageLayout";
import NewtonDividedDifferences from "./NewtonDividedDifferences";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Newton Divided-Differences",
  description: "Newton Divided-Differences | Numerical Methods",
};

export const dynamic = "force-dynamic";

export default async function NewtonDividedDifferencesPage() {
  const question = await getQuestion("Newton Divided-Differences");

  return (
    <PageLayout title="Newton Divided-Differences">
      <NewtonDividedDifferences question={question.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
