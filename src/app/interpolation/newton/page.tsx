import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import { Metadata } from "next";
import NewtonDividedDifferences from "./NewtonDividedDifferences";

export const metadata: Metadata = {
  title: "Newton Divided-Differences",
  description: "Newton Divided-Differences | Numerical Methods",
};

export default async function NewtonDividedDifferencesPage() {
  const data = await Solutions.getData("Newton Divided-Differences");
  return (
    <PageLayout title="Newton Divided-Differences">
      <NewtonDividedDifferences question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
