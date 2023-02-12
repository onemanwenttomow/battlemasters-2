import Image from "next/image";
import useStore from "hooks/useStore";

export default function CurrentTurn() {
  const { activeUnit, setActiveUnit } = useStore((store) => store);

  const activeUnits = useStore((store) =>
    store.units.filter((unit) => unit.isActive)
  );

  function handleClick(id: string) {
    setActiveUnit(id);
  }

  const isGrimorg = activeUnits.map((unit) => unit.id).includes("grimorg");

  return (
    <div>
      <h2>Current Turn</h2>
      {activeUnits.length === 0 && <div>No active units</div>}
      <div>
        {!isGrimorg &&
          activeUnits.map((unit) => {
            const isSelected = unit.id === activeUnit?.id;
            return (
              <div key={unit.id}>
                <Image
                  src={unit.src}
                  alt={unit.id}
                  width="32"
                  height="32"
                  style={{
                    filter: `brightness(${isSelected ? "1.4" : "1"})`,
                  }}
                  className="cursor-pointer"
                  onClick={() => handleClick(unit.id)}
                />
              </div>
            );
          })}
        <div>{isGrimorg && <div>Grimorg Cards</div>}</div>
      </div>
    </div>
  );
}
