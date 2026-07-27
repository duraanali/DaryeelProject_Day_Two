import { useState } from "react";

// Two kinds of state side by side: showDetails is LOCAL (only this card cares);
// pledgedQuantity is SHARED, handed in from App as a prop (the card only reads it).
function WinterNeedCard({ need, pledgedQuantity }) {
  const [showDetails, setShowDetails] = useState(false);

  // Progress is derived every render — received + pledged, capped at 100%.
  const contributed = need.receivedQuantity + pledgedQuantity;
  const progressPct = Math.min(100, Math.round((contributed / need.requestedQuantity) * 100));
  const isUrgent = need.priority === "Urgent";

  function handleToggleDetails() {
    setShowDetails((prev) => !prev);
  }

  return (
    <article className={isUrgent ? "need-card need-card--urgent" : "need-card"}>
      <div className="badge-row">
        <span className="badge">{need.category}</span>
        <span className={isUrgent ? "badge badge--urgent" : "badge"}>{need.priority} priority</span>
      </div>
      <h2>{need.name}</h2>
      <p>{need.description}</p>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: progressPct + "%" }}></div>
      </div>
      <p className="progress-caption">
        {need.receivedQuantity} received
        {pledgedQuantity > 0 && <span className="pledged-note"> + {pledgedQuantity} pledged</span>}{" "}
        of {need.requestedQuantity} ({progressPct}%)
      </p>
      <button type="button" className="details-button" onClick={handleToggleDetails}>
        {showDetails ? "Hide donation details" : "Show donation details"}
      </button>
      {showDetails && (
        <div className="need-details">
          <p><strong>Sizes needed:</strong> {need.sizes.join(", ")}</p>
          <p><strong>Condition:</strong> {need.condition}</p>
          <p><strong>Still needed:</strong> {Math.max(0, need.requestedQuantity - contributed)} items</p>
        </div>
      )}
    </article>
  );
}

export default WinterNeedCard;
