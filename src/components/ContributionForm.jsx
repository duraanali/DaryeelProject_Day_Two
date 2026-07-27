import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Where donors can drop items off (fictional community locations).
const DROPOFF_LOCATIONS = [
  "Brian Coyle Center",
  "Cedar-Riverside Plaza",
  "Karmel Mall",
  "Rochester Community Center",
];

// Zod schema: one place that says what a valid pledge looks like.
const pledgeSchema = z.object({
  needId: z.string().min(1, "Please choose an item"),
  size: z.string().min(1, "Please choose a size"),
  quantity: z.preprocess(
    (value) => {
      if (typeof value === "number" && Number.isNaN(value)) return undefined;
      if (typeof value === "string" && value.trim() === "") return undefined;
      return value;
    },
    z
      .number({
        required_error: "Enter a number",
        invalid_type_error: "Enter a number",
      })
      .min(1, "At least 1"),
  ),
  donorName: z.string().trim().min(2, "Please enter your name"),
  dropoff: z.string().min(1, "Choose a drop-off location"),
});

function ContributionForm({ needs, onAddPledge }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    // Zod does the validating; RHF does the wiring.
    resolver: zodResolver(pledgeSchema),
    defaultValues: {
      needId: "",
      size: "",
      quantity: "",
      donorName: "",
      dropoff: "",
    },
  });

  // Live reads for the summary and the dependent size list.
  const needId = watch("needId");
  const quantity = watch("quantity");
  const size = watch("size");

  // Size options depend on the chosen item — pick an item first.
  const selectedNeed = needs.find((need) => need.id === needId);
  const sizeOptions = selectedNeed ? selectedNeed.sizes : [];

  function nameFor(id) {
    const match = needs.find((need) => need.id === id);
    return match ? match.name : "";
  }

  // handleSubmit runs Zod first; onValid only fires if everything passes.
  function onValid(data) {
    onAddPledge({ id: crypto.randomUUID(), ...data });
    reset();
  }

  return (
    <form className="contribution-form" onSubmit={handleSubmit(onValid)}>
      <h2>Make a pledge</h2>

      <div className="form-field">
        <label htmlFor="donorName">Your name</label>
        <input
          id="donorName"
          type="text"
          placeholder="e.g. Amina"
          {...register("donorName")}
        />
        {errors.donorName && (
          <p className="field-error" role="alert">
            {errors.donorName.message}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="needId">Item</label>
        <select id="needId" {...register("needId")}>
          <option value="">Choose an item…</option>
          {needs.map((need) => (
            <option key={need.id} value={need.id}>
              {need.name}
            </option>
          ))}
        </select>
        {errors.needId && (
          <p className="field-error" role="alert">
            {errors.needId.message}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="size">Size</label>
        {/* Options come from the selected item; disabled until one is picked. */}
        <select id="size" disabled={!selectedNeed} {...register("size")}>
          <option value="">
            {selectedNeed ? "Choose a size…" : "Pick an item first"}
          </option>
          {sizeOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.size && (
          <p className="field-error" role="alert">
            {errors.size.message}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="quantity">How many?</label>
        <input
          id="quantity"
          type="number"
          inputMode="numeric"
          placeholder="e.g. 5"
          {...register("quantity", { valueAsNumber: true })}
        />
        {errors.quantity && (
          <p className="field-error" role="alert">
            {errors.quantity.message}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="dropoff">Drop-off location</label>
        <select id="dropoff" {...register("dropoff")}>
          <option value="">Choose a location…</option>
          {DROPOFF_LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        {errors.dropoff && (
          <p className="field-error" role="alert">
            {errors.dropoff.message}
          </p>
        )}
      </div>

      {/* Live summary via watch(): updates on every keystroke. */}
      {quantity && needId && (
        <p className="form-summary">
          You're pledging <strong>{quantity}</strong> × {nameFor(needId)}
          {size && ` (size ${size})`}.
        </p>
      )}

      <button type="submit" className="pledge-button">
        Add pledge
      </button>
    </form>
  );
}

export default ContributionForm;
