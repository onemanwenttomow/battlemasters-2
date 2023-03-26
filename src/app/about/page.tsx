"use client";

import Image from "next/image";
import Link from "next/link";
import YouTube from "react-youtube";

export default function About() {
  return (
    <>
      <div className="bg-white bg-opacity-70" style={{ height: "635px" }}>
        <h2>About</h2>
        <YouTube videoId="SfFl9Zvm5Vk" />
      </div>
      <div
        className="relative bg-white bg-opacity-0  row-start-1 row-end-2 col-start-2"
        style={{ height: "685px" }}
      >
        <Image
          src="/battle.jpeg"
          alt="battle"
          className="object-cover"
          fill
          priority
          sizes="(max-width: 400px) 100vw,"
        />
      </div>
    </>
  );
}
