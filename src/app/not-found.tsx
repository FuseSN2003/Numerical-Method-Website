import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="prose w-full mx-auto text-center translate-y-1/2">
      <h1 className="text-8xl">404</h1>
      <h2 className="text-4xl">Not Found</h2>
      <Button variant="default" className="py-6 px-8"><Link href="/" className="text-lg text-white no-underline">Return to Home</Link></Button>
    </div>
  );
}
