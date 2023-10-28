import React from "react";
import PageLayout from "@/components/PageLayout";
import GraphicalMethod from "./GraphicalMethod"; 
import Solutions from "@/lib/solutions/Solutions";

export default async function GraphicalMethodPage() {
  const data = await Solutions.getData("Graphical Method");

  return (
    <PageLayout title="Graphical Method">
      <GraphicalMethod question={data.map((data: any) => data.form)}/>
    </PageLayout>
  );
}
