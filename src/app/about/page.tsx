"use client";

import Image from "next/image";
import YouTube from "react-youtube";
import MainWrapper from "../components/MainWrapper";

export default function About() {
  return (
    <>
      <MainWrapper>
        <h2>About</h2>
        <YouTube videoId="SfFl9Zvm5Vk" />
      </MainWrapper>

      <div
        className="relative col-start-2 row-start-1 row-end-2 bg-white bg-opacity-0"
        style={{ height: "755px" }}
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
