import { ReactNode } from "react";

export default function MainWrapper({ children }: { children: ReactNode }) {
  return (
    <div
      className="squiggle row-start-2 mt-4 mr-4 bg-white bg-opacity-0 p-4"
      style={{ height: "680px" }}
    >
      {children}
    </div>
  );
}
