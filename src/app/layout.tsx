import { Press_Start_2P } from "@next/font/google";
import "./globals.css";

import bg from "../../public/background_map.jpeg";
import SquiggleSvg from "./components/SquiggleSvg";
import Header from "./components/Header";

const press_Start_2P = Press_Start_2P({ weight: "400", subsets: ["cyrillic"] });

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
      <body className={press_Start_2P.className}>
        <main
          className="relative grid grid-cols-[_915px_400px] grid-rows-[_50px_1fr] justify-center p-4 pt-12"
          style={{
            backgroundImage: `linear-gradient(black, black), url(${bg.src})`,
            backgroundSize: "cover",
            backgroundBlendMode: "soft-light",
          }}
        >
          <Header />
          {children}
        </main>

        <SquiggleSvg />
      </body>
    </html>
  );
}
