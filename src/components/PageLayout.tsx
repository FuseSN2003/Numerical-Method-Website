import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}
6
export default function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div className="w-full flex flex-col gap-12 p-2 md:p-0">
      <div className="prose text-center underline mx-auto">
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  );
}
