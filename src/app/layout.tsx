import "./globals.css";
import bg from "../../public/background_map.jpeg";
import Link from "next/link";
import SquiggleSvg from "./components/SquiggleSvg";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <main
          className="relative p-4 pt-12 grid grid-cols-[_915px_400px] grid-rows-[_50px_1fr] justify-center"
          style={{
            backgroundImage: `linear-gradient(black, black), url(${bg.src})`,
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundBlendMode: "soft-light",
          }}
        >
          <header className="flex items-center gap-4">
            <Link href="/" className="bg-white p-2">
              Home
            </Link>
            <Link href="/about" className="bg-white p-2">
              About
            </Link>
          </header>
          {children}
        </main>
        <SquiggleSvg />
      </body>
    </html>
  );
}
