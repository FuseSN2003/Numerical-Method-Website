import PageLayout from "@/components/PageLayout";
import Solutions from "@/lib/solutions/Solutions";
import Secant from "./Secant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secant Method",
  description: "Secant | Numerical Methods",
};

export default async function SecantMethodPage() {
  const data = await Solutions.getData("Secant Method");
  
  return (
    <PageLayout title="Secant Method">
      <Secant question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
