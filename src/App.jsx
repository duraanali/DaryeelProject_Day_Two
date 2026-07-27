import { useState } from "react";
import { winterNeeds } from "./data/winterNeeds";
import WinterNeedList from "./components/WinterNeedList";
import ContributionForm from "./components/ContributionForm";
import PledgeList from "./components/PledgeList";

// App owns the shared pledges list (lifting state up): the form, the pledge
// list, the cards, and the header total all need it, so it lives in their
// closest common parent. Data flows down as props; events flow up as handlers.
function App() {
  // needs is still read-only this week (setNeeds waits for Week 3's network data).
  const [needs, setNeeds] = useState(winterNeeds);
  const [pledges, setPledges] = useState([]);
  const [confirmation, setConfirmation] = useState("");

  // Immutable add: a NEW array, so React sees the change and re-renders.
  function handleAddPledge(pledge) {
    setPledges((prev) => [...prev, pledge]);
    // Brief thank-you that clears itself (Week 13 formalizes effects + cleanup).
    setConfirmation(`Thank you, ${pledge.donorName}! Your pledge is on the board.`);
    setTimeout(() => setConfirmation(""), 4000);
  }

  // Immutable remove via filter (also a new array).
  function handleCancelPledge(id) {
    setPledges((prev) => prev.filter((pledge) => pledge.id !== id));
  }

  // Derived, not stored — recomputed from pledges every render.
  const totalPledged = pledges.reduce((sum, pledge) => sum + Number(pledge.quantity), 0);

  // Pledged toward one need; passed down so a card can ask "how many for me?".
  function pledgedFor(needId) {
    return pledges
      .filter((pledge) => pledge.needId === needId)
      .reduce((sum, pledge) => sum + Number(pledge.quantity), 0);
  }

  return (
    <main className="board">
      <header className="board-head">
        <h1>Daryeel Winter Warmth</h1>
        <p className="board-intro">Tracking {needs.length} winter needs this season.</p>
        <p className="board-total">
          <strong>{totalPledged}</strong> item{totalPledged === 1 ? "" : "s"} pledged so far
        </p>
      </header>

      {/* Success feedback; role="status" so screen readers announce it. */}
      {confirmation && (
        <p className="confirmation-banner" role="status">✓ {confirmation}</p>
      )}

      <section className="contribution-panel">
        <ContributionForm needs={needs} onAddPledge={handleAddPledge} />
        <PledgeList pledges={pledges} needs={needs} onCancelPledge={handleCancelPledge} />
      </section>

      <WinterNeedList needs={needs} pledgedFor={pledgedFor} />

      <footer className="board-footer">
        <p>
          An educational classroom prototype created in support of{" "}
          <a href="https://daryeelyouth.org/" target="_blank" rel="noopener noreferrer">
            Daryeel Youth
          </a>
          . Not an official Daryeel product — all campaign data is fictional.
        </p>
      </footer>
    </main>
  );
}

export default App;
