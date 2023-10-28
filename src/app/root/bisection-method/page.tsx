import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";
import React from "react";
import BisectionMethod from "./BisectionMethod";
import Solutions from "@/lib/solutions/Solutions";

export const metadata: Metadata = {
  title: "Bisection Method",
  description: "Bisection Method | Numerical Methods",
};

export default async function BisectionMethodPage() {
  const data = await Solutions.getData("Bisection Method");
  
  return (
    <PageLayout title="Bisection Method">
      <BisectionMethod question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
