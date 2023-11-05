"use client"

import { MenuDataType, differentiation, integration, interpolation, leastSqaures, linearAlgebraEquation, rootOfEquation } from "@/lib/menuData";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import Link from "next/link";

const selectItem = [
  { label: "Root of Equation", value: "rootOfEquation"},
  { label: "Linear Algebra Equation", value: "linearAlgebraEquation"},
  { label: "Interpolation", value: "interpolation"},
  { label: "Least-Squares Regression", value: "least-Squares"},
  { label: "Integration", value: "integration"},
  { label: "Differentiation", value: "differentiation"},
]

export default function SelectMenu() {
  const [menu, setMenu] = useState<MenuDataType[]>(rootOfEquation);
  const [title, setTitle] = useState<string>("Root Of Equation");
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    switch (selected) {
      case "rootOfEquation": {
        setTitle("Root Of Equation");
        setMenu(rootOfEquation);
        break;
      }
      case "linearAlgebraEquation": {
        setTitle("Linear Algebra Equation");
        setMenu(linearAlgebraEquation);
        break;
      }
      case "interpolation": {
        setTitle("Interpolation");
        setMenu(interpolation);
        break;
      }
      case "least-Squares": {
        setTitle("Least-Squares Regression");
        setMenu(leastSqaures);
        break;
      }
      case "integration": {
        setTitle("Integration");
        setMenu(integration);
        break;
      }
      case "differentiation": {
        setTitle("Differentiation");
        setMenu(differentiation);
        break;
      }
      default:
        break;
    }
  }, [selected])

  return (
    <div className="w-full flex flex-col items-center gap-8 min-h-[55dvh]">
      <Select defaultValue="rootOfEquation" onValueChange={(e) => setSelected(e)}>
        <SelectTrigger className="w-60">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {selectItem.map((data, index) => (
            <SelectItem key={index} value={data.value}>{data.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="prose p-4 text-center">
        <h2>{title}</h2>
      </div>
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 place-items-center gap-4">
        {menu.map((data, index) => (
          <Link
            key={index}
            href={data.link}
            className={`w-80 font-bold text-center border p-4 text-white bg-gradient-to-t from-secondary to-primary rounded-xl hover:scale-105 duration-150 ${selected === "differentiation" && "col-span-2"}`}
          >
            {data.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
