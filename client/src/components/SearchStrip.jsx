import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchStrip() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickup) params.set("pickup", pickup);
    if (destination) params.set("destination", destination);
    if (date) params.set("date", date);
    if (passengers) params.set("passengers", passengers);
    navigate(`/contact?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-strong flex w-full max-w-4xl flex-col divide-y divide-gold/25 rounded-2xl lg:flex-row lg:divide-x lg:divide-y-0 lg:rounded-full"
    >
      <label className="flex-1 px-6 py-4">
        <span className="block text-[11px] font-semibold uppercase tracking-wider text-gold-light">
          Pickup Location
        </span>
        <input
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          type="text"
          placeholder="Udupi, Manipal…"
          className="mt-1 w-full bg-transparent font-sans text-sm text-cream placeholder:text-cream/40 focus:outline-none"
        />
      </label>

      <label className="flex-1 px-6 py-4">
        <span className="block text-[11px] font-semibold uppercase tracking-wider text-gold-light">
          Drop / Destination
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
          Pickup Date
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
          Passengers
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
