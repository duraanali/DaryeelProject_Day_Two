import WinterNeedCard from "./WinterNeedCard";

// Pass-through: hands each card its own pledged number (data down, one level).
function WinterNeedList({ needs, pledgedFor }) {
  return (
    <div className="board-grid">
      {needs.map((need) => (
        <WinterNeedCard key={need.id} need={need} pledgedQuantity={pledgedFor(need.id)} />
      ))}
    </div>
  );
}

export default WinterNeedList;
