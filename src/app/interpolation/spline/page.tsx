import PageLayout from "@/components/PageLayout";
import SplineInterpolation from "./SplineInterpolation";
import { Metadata } from "next";
import { getQuestion } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Spline Interpolation",
  description: "Spline Interpolation | Numerical Methods",
};

export const dynamic = "force-dynamic";

export default async function SplineIntepolationPage() {
  const question = await getQuestion("Spline Interpolation");

  return (
    <PageLayout title="Spline Interpolation">
      <SplineInterpolation question={question.map((data: any) => data.form)}/>
    </PageLayout>
  )
}
