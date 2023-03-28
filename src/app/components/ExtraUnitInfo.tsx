import { motion } from "framer-motion";
import Image from "next/image";
import { Unit } from "types";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 5,
    opacity: 1,
  },
};

export default function ExtraUnitInfo({ unit }: { unit: Unit }) {
  return (
    <motion.div
      className="absolute -top-8 left-0 flex w-full justify-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {[...Array.from(Array(unit.damageSustained))]
        .map((_el, i) => i)
        .map((damage) => (
          <motion.div key={damage} variants={item}>
            <Image
              className="inline"
              src="/extra-tiles/damage.png"
              alt="damage"
              height="15"
              width="15"
              style={{
                transform: `translateY(-${(unit.y || 0) * 22.5}px)`,
              }}
            />
          </motion.div>
        ))}
    </motion.div>
  );
}
