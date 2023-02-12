import Image from "next/image";
import useStore from "hooks/useStore";

export default function CurrentTurn() {
  const { activeUnit, setActiveUnit, skipMove } = useStore((store) => store);

  const activeUnits = useStore((store) =>
    store.units.filter((unit) => unit.isActive)
  );

  const isGrimorg = activeUnits.map((unit) => unit.id).includes("grimorg");

  return (
    <div>
      <h2>Current Turn</h2>
      {activeUnits.length === 0 && <div>No active units</div>}
      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Unit</th>
              <th>Moved</th>
              <th>Attacked</th>
            </tr>
          </thead>
          <tbody>
            {!isGrimorg &&
              activeUnits.map((unit) => {
                const isSelected = unit.id === activeUnit;
                return (
                  <tr key={unit.id}>
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
                      <div>{unit.hasMoved ? "✅" : "❌"}</div>
                      <button
                        disabled={unit.hasMoved}
                        onClick={() => skipMove(unit.id)}
                      >
                        Skip
                      </button>
                    </td>
                    <td className="p-2">
                      <div>{unit.hasAttacked ? "✅" : "❌"}</div>
                      <button>Skip</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div>{isGrimorg && <div>Grimorg Cards</div>}</div>
      </div>
    </div>
  );
}
