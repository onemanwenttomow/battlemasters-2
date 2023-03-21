import useStore from "hooks/useStore";

export default function DefeatedUnits() {
  const { defeatedUnits } = useStore((store) => store);

  console.log(defeatedUnits)

  return <div>Defeated</div>
}