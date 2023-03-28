"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useStore from "../../../hooks/useStore";

export default function Header() {
  const router = useRouter();

  const { resetGame } = useStore((state) => state);

  function handleRestart() {
    resetGame();
    router.push("/");
  }
  return (
    <header className="flex items-center gap-4">
      <Link href="/" className="bg-white p-2">
        Home
      </Link>
      <Link href="/about" className="bg-white p-2">
        About
      </Link>
      <div className="bg-white p-2" onClick={handleRestart}>
        Restart
      </div>
    </header>
  );
}
