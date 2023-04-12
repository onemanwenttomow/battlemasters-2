import Image from "next/image";
import useStore from "hooks/useStore";

interface Props {
  width: number;
  height: number;
  backSrc: string;
  frontSrc: string;
  animating: boolean;
  move?: boolean;
  handleClick?: () => void;
}

export default function CardFlip({
  width,
  height,
  backSrc,
  frontSrc,
  animating,
  move,
  handleClick,
}: Props) {
  const { activeUnitsTurnComplete } = useStore((store) => store);

  return (
    <div
      className={`group absolute z-10 cursor-pointer perspective`}
      style={{ width: width + "px", height: height + "px" }}
      onClick={handleClick}
    >
      <div
        className={`relative h-full w-full duration-300 preserve-3d ${
          animating ? "card-move-flip" : ""
        }`}
      >
        <div className="absolute h-full w-full backface-hidden">
          <Image
            src={backSrc}
            alt="back of card"
            width={width}
            height={height}
            priority
            className={`${activeUnitsTurnComplete() ? "" : "grayscale"}`}
          />
        </div>
        <div className="absolute h-full w-full flip backface-hidden">
          <Image
            src={frontSrc}
            alt="front of card"
            width={width}
            height={height}
            priority
            className="absolute"
          />
        </div>
      </div>
    </div>
  );
}
