import Image from "next/image";
import useStore from "hooks/useStore";

interface Props {
  width: number;
  height: number;
  backSrc: string;
  frontSrc: string;
  animating: boolean;
  handleClick?: () => void;
}

export default function CardFlip({
  width,
  height,
  backSrc,
  frontSrc,
  animating,
  handleClick,
}: Props) {
  const { activeUnitsTurnComplete } = useStore((store) => store);
  return (
    <div
      className={`absolute cursor-pointer group perspective z-10`}
      style={{ width: width + "px", height: height + "px" }}
      onClick={handleClick}
    >
      <div
        className={`relative preserve-3d w-full h-full duration-300 ${
          animating ? "card-move-flip" : ""
        }`}
      >
        <div className="absolute backface-hidden w-full h-full">
          <Image
            src={backSrc}
            alt="back of card"
            width={width}
            height={height}
            priority
            className={`${activeUnitsTurnComplete() ? "" : "grayscale"}`}
          />
        </div>
        <div className="absolute flip backface-hidden w-full h-full">
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
