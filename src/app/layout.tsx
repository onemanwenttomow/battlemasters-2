import "./globals.css";
import bg from "../../public/background_map.jpeg";
import SquiggleSvg from "./components/SquiggleSvg";
import Header from "./components/Header";

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
          <Header />
          {children}
        </main>

        <SquiggleSvg />
      </body>
    </html>
  );
}
