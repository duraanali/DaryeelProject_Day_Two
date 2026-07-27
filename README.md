# Daryeel Winter Warmth — Week Two (Contribution Flow)

Instructor reference build for the **second React class** (portal Week 12 · Shared State & Forms).
This is the app exactly as it stands at the end of that lesson's code-along — it continues directly
from Week One.

> An educational classroom prototype created in support of Daryeel Youth. Not an official
> Daryeel product — all campaign data in `src/data/winterNeeds.js` is fictional, and the app
> is donor-facing only (no youth information anywhere).

## Run it

```bash
npm install
npm run dev
```

`npm install` now also pulls in **react-hook-form**, **yup**, and **@hookform/resolvers**.

## What this week demonstrates

- **Lifting state up** — `pledges` lives in `App`, the closest common owner of everything that
  reads or changes it (the form, the pledge list, the cards, the header total)
- **Data down, events up** — `App` passes data down as props and hands down `onAddPledge` /
  `onCancelPledge`; children call those functions up to ask for a change
- **Immutable updates** — add with `[...prev, pledge]`, remove with `prev.filter(...)`, always via
  the `setPledges(prev => ...)` updater; never `push`
- **React Hook Form + Yup** — `useForm({ resolver: yupResolver(schema) })` → `register` each field →
  `handleSubmit(onValid)` → `formState.errors` → `reset`. One Yup schema declares what a valid pledge
  looks like (name, item, size, quantity ≥ 1, drop-off location)
- **A dependent field** — the Size options come from the selected item via `watch("needId")`
- **`watch()`** — a live summary that updates as the donor types ("You're pledging 3 × …")
- **Derive, don't store** — the header total and each card's pledged number are computed from
  `pledges` on every render, never held in their own state
- **String ids** — need ids are strings and new pledges use `crypto.randomUUID()`, so a `<select>`
  value matches a need directly (see the teacher note in `src/data/winterNeeds.js`)

## Teacher comments

Every file carries comments written for **you**, not the students — look for `TEACHER:` notes that
flag the exact moment to pause and make a point (the identity lesson, data-down/events-up, why the
Cancel button lives in `PledgeList` but the handler lives in `App`, etc.). Strip or keep them as you
like when sharing code with the class.

## Files

```text
index.html                         — unchanged from Week One
src/main.jsx                       — entry point (StrictMode note added for Week 3)
src/App.jsx                        — owns pledges; handlers; derived totals; pledgedFor
src/index.css                      — Week One stylesheet + a Week Two section
src/data/winterNeeds.js            — the six needs, now with string ids
src/components/WinterNeedList.jsx  — passes each card its pledgedFor(need.id)
src/components/WinterNeedCard.jsx  — progress bar now includes pledges
src/components/ContributionForm.jsx — the React Hook Form pledge form + watch summary
src/components/PledgeList.jsx      — shows pledges, cancels one, empty state
```

## Next weeks

Week Three replaces the `winterNeeds.js` file with a real network fetch (loading / error / empty
states) and introduces routing. The pledges you build this week stay in memory only — making them
survive a refresh is Week Four (persistence).
