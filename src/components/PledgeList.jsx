// Shows the pledges and cancels one. Owns no state: data comes down as props,
// canceling goes up via onCancelPledge (the button is here, the handler is in App).
function PledgeList({ pledges, needs, onCancelPledge }) {
  function nameFor(needId) {
    const match = needs.find((need) => need.id === needId);
    return match ? match.name : "Unknown item";
  }

  // Early-return empty state.
  if (pledges.length === 0) {
    return (
      <div className="pledge-list">
        <h2>Your pledges</h2>
        <p className="empty-state">No pledges yet. Fill in the form to make your first one. 🧣</p>
      </div>
    );
  }

  return (
    <div className="pledge-list">
      <h2>Your pledges</h2>
      <ul className="pledge-rows">
        {pledges.map((pledge) => (
          // key is the stable string id, never the array index.
          <li key={pledge.id} className="pledge-row">
            <span className="pledge-text">
              <strong>{pledge.quantity}</strong> × {nameFor(pledge.needId)} ({pledge.size})
              <span className="pledge-meta">{pledge.donorName} · {pledge.dropoff}</span>
            </span>
            <button
              type="button"
              className="pledge-cancel"
              onClick={() => onCancelPledge(pledge.id)}
            >
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PledgeList;
