import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-gradient-to-tl from-secondary to-primary sticky top-0 shadow-xl overflow-hidden z-50 px-4 md:px-8">
      <div className="w-full h-full flex items-center">
        <Link href="/">
          <h1 className="text-white font-bold text-2xl whitespace-nowrap">Numerical Method</h1>
        </Link>
      </div>
    </nav>
  )
}