import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center gap-4">
      <Link href="/" className="bg-white p-2">
        Home
      </Link>
      <Link href="/about" className="bg-white p-2">
        About
      </Link>
    </header>
  );
}
