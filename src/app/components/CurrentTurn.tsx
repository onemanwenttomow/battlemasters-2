import { motion } from "framer-motion";
import Image from "next/image";
import useStore from "hooks/useStore";
import { filterDefeatedUnits } from "lib/utils";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function CurrentTurn() {
  const { activeUnit, setActiveUnit, skipMove, skipAttack, skipEntireTurn } =
    useStore((store) => store);

  const activeUnits = useStore((store) =>
    store.units.filter((unit) => unit.isActive).filter(filterDefeatedUnits)
  );

  const isGrimorg = activeUnits.map((unit) => unit.id).includes("grimorg");

  if (activeUnits.length === 0) {
    return <div>No active units</div>;
  }

  return (
    <>
      {activeUnits.length > 0 && (
        <button type="button" onClick={skipEntireTurn}>
          Skip entire turn
        </button>
      )}
      <table className="table-auto">
        <thead>
          <tr>
            <th>Unit</th>
            <th>Moved</th>
            <th>Attacked</th>
          </tr>
        </thead>
        <motion.tbody
          key={activeUnits.map(unit => unit.id).join()}
          variants={container}
          initial="hidden"
          animate="visible">
          {!isGrimorg &&
            activeUnits.map((unit) => {
              const isSelected = unit.id === activeUnit;
              return (
                <motion.tr key={unit.id} variants={item}>
                  <td className="p-2">
                    <Image
                      src={unit.src}
                      alt={unit.id}
                      width="32"
                      height="32"
                      style={{
                        filter: `brightness(${isSelected ? "1.4" : "1"})`,
                      }}
                      className="cursor-pointer"
                      onClick={() => setActiveUnit(unit.id)}
                    />
                  </td>
                  <td className="p-2">
                    <div className="inline-block">
                      {unit.hasMoved ? "✅" : "⏳"}
                    </div>
                    <button
                      className="disabled:opacity-75 disabled:bg-gray-200 bg-blue-500 px-2 py-1"
                      disabled={unit.hasMoved}
                      onClick={() => skipMove(unit.id)}
                    >
                      Skip
                    </button>
                  </td>
                  <td className="p-2">
                    <div className="inline-block">
                      {unit.hasAttacked ? "✅" : "⏳"}
                    </div>
                    <button
                      className="disabled:opacity-75 disabled:bg-gray-200 bg-blue-500 px-2 py-1"
                      disabled={unit.hasAttacked || !unit.hasMoved}
                      onClick={() => skipAttack(unit.id)}
                    >
                      Skip
                    </button>
                  </td>
                </motion.tr>
              );
            })}
        </motion.tbody>
      </table>
    </>
  );
}
