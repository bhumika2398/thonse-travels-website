import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchStrip() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (date) params.set("date", date);
    if (passengers) params.set("passengers", passengers);
    navigate(`/contact?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-dark flex w-full max-w-4xl flex-col divide-y divide-white/15 rounded-2xl lg:flex-row lg:divide-x lg:divide-y-0 lg:rounded-full"
    >
      {/* Kept to 3 fields — destination, date, fleet size — so the strip
          stays a quick, functional prompt rather than a full booking form
          (that's what the Contact page's BookingForm is for). A separate
          pickup-location field was dropped: nearly every pickup starts in
          Udupi/Manipal, so it added a field without adding much signal. */}
      <label className="flex-1 px-6 py-4">
        <span className="block text-[11px] font-semibold uppercase tracking-wider text-gold-light">
          Where To
        </span>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          type="text"
          placeholder="Malpe, Murdeshwar, Airport…"
          className="mt-1 w-full bg-transparent font-sans text-sm text-cream placeholder:text-cream/40 focus:outline-none"
        />
      </label>

      <label className="flex-1 px-6 py-4">
        <span className="block text-[11px] font-semibold uppercase tracking-wider text-gold-light">
          When
        </span>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="mt-1 w-full bg-transparent font-sans text-sm text-cream placeholder:text-cream/40 focus:outline-none [color-scheme:dark]"
        />
      </label>

      <label className="flex-1 px-6 py-4">
        <span className="block text-[11px] font-semibold uppercase tracking-wider text-gold-light">
          Fleet Size
        </span>
        <select
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          className="mt-1 w-full bg-transparent font-sans text-sm text-cream focus:outline-none [color-scheme:dark]"
        >
          <option className="text-ink" value="">
            Select
          </option>
          <option className="text-ink" value="1-4">
            Swift Dzire (1-4)
          </option>
          <option className="text-ink" value="5-6">
            Ertiga (5-6)
          </option>
          <option className="text-ink" value="airport">
            Airport Transfer
          </option>
        </select>
      </label>

      <div className="flex items-center p-2 lg:pl-2 lg:pr-2">
        <button type="submit" className="btn-gold w-full lg:w-auto whitespace-nowrap">
          Search
        </button>
      </div>
    </form>
  );
}
