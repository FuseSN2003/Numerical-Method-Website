import React from "react";
import PageLayout from "@/components/PageLayout";
import GraphicalMethod from "./GraphicalMethod"; 
import Solutions from "@/lib/solutions/Solutions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphical Method",
  description: "Graphical Method | Numerical Methods",
};

export default async function GraphicalMethodPage() {
  const data = await Solutions.getData("Graphical Method");

  return (
    <PageLayout title="Graphical Method">
      <GraphicalMethod question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
