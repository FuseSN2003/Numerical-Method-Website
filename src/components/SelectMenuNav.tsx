"use client"

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { differentiation, integration, interpolation, leastSqaures, linearAlgebraEquation, rootOfEquation } from "@/lib/menuData";
import { useState } from "react";
import { Home, Menu } from "lucide-react";

export default function SelectMenuNav() {
  const [openSheet, setOpenSheet] = useState<boolean>(false)

  return (
    <Sheet onOpenChange={setOpenSheet} open={openSheet}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="text-white hover:bg-black/5 hover:text-white"><Menu size={32}/></Button>
        </SheetTrigger>
        <SheetContent className="p-10 overflow-y-auto no-scrollbar">
          <p><Link href="/" className="text-2xl inline-flex items-center gap-4 hover:text-primary duration-100"><Home /> Home</Link></p>
          <Accordion type="multiple">
            <AccordionItem value="root">
              <AccordionTrigger>Root Of Equation</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {rootOfEquation.map((data, index) => (
                    <p key={index} onClick={() => setOpenSheet(false)}><Link className="text-dark text-[16px] hover:text-primary hover:underline duration-100" href={data.link}>{data.label}</Link></p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="linear">
              <AccordionTrigger>Linear Algebra Equation</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {linearAlgebraEquation.map((data, index) => (
                    <p onClick={() => setOpenSheet(false)} key={index}><Link className="text-dark text-[16px] hover:text-primary hover:underline duration-100" href={data.link}>{data.label}</Link></p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="inter">
              <AccordionTrigger>Interpolation</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {interpolation.map((data, index) => (
                    <p onClick={() => setOpenSheet(false)} key={index}><Link className="text-dark text-[16px] hover:text-primary hover:underline duration-100" href={data.link}>{data.label}</Link></p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="least-sqaures">
              <AccordionTrigger>Least-Sqaures Regression</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {leastSqaures.map((data, index) => (
                    <p onClick={() => setOpenSheet(false)} key={index}><Link className="text-dark text-[16px] hover:text-primary hover:underline duration-100" href={data.link}>{data.label}</Link></p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="integrate">
              <AccordionTrigger>Integration</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {integration.map((data, index) => (
                    <p onClick={() => setOpenSheet(false)} key={index}><Link className="text-dark text-[16px] hover:text-primary hover:underline duration-100" href={data.link}>{data.label}</Link></p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="diff">
              <AccordionTrigger>Differentiation</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {differentiation.map((data, index) => (
                    <p onClick={() => setOpenSheet(false)} key={index}><Link className="text-dark text-[16px] hover:text-primary hover:underline duration-100" href={data.link}>{data.label}</Link></p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SheetContent>
      </Sheet>
  )
}
