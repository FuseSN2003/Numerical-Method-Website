import SelectMenu from "@/components/SelectMenu";
import React from "react";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center gap-8 py-8 px-16 rounded-lg bg-white shadow-lg overflow-hidden">
      <div className="prose text-center">
        <h1 className='border-b-4 border-primary py-2'>Numerical Methods</h1>
      </div>
      <SelectMenu />
    </div>
  );
}
