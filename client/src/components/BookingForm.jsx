import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createBooking, fetchFleet } from "../api/client.js";
import { airportService } from "../data/services.js";

const initialState = {
  name: "",
  phone: "",
  email: "",
  vehicle: "",
  pickupLocation: "",
  destination: "",
  date: "",
  passengers: "",
  notes: "",
};

export default function BookingForm() {
  const [searchParams] = useSearchParams();
  const [fleet, setFleet] = useState([]);
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  useEffect(() => {
    fetchFleet()
      .then(setFleet)
      .catch(() => setFleet([]));
  }, []);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      vehicle: searchParams.get("vehicle") || prev.vehicle,
      pickupLocation: searchParams.get("pickup") || prev.pickupLocation,
      destination: searchParams.get("destination") || prev.destination,
      date: searchParams.get("date") || prev.date,
      passengers: searchParams.get("passengers") || prev.passengers,
    }));
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const res = await createBooking(form);
      setStatus({ state: "success", message: res.message || "Booking received!" });
      setForm(initialState);
    } catch (err) {
      setStatus({
        state: "error",
        message:
          err?.response?.data?.message || "Something went wrong. Please call us directly.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-7 sm:p-9 space-y-5">
      <h3 className="font-display text-2xl font-semibold text-ink">Request a Booking</h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required />
        <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required type="tel" />
        <Field label="Email (optional)" name="email" value={form.email} onChange={handleChange} type="email" />
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold-dark mb-1.5">
            Vehicle
          </label>
          <select
            name="vehicle"
            value={form.vehicle}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gold/30 bg-white/60 px-4 py-3 text-sm text-ink focus:outline-none focus:border-gold"
          >
            <option value="">Select a vehicle</option>
            {fleet.map((v) => (
              <option key={v.slug || v.name} value={v.name}>
                {v.name}
              </option>
            ))}
            <option value={airportService.name}>{airportService.name}</option>
          </select>
        </div>
        <Field label="Pickup Location" name="pickupLocation" value={form.pickupLocation} onChange={handleChange} />
        <Field label="Destination" name="destination" value={form.destination} onChange={handleChange} />
        <Field label="Travel Date" name="date" value={form.date} onChange={handleChange} required type="date" />
        <Field label="Passengers" name="passengers" value={form.passengers} onChange={handleChange} />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gold-dark mb-1.5">
          Notes (optional)
        </label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-xl border border-gold/30 bg-white/60 px-4 py-3 text-sm text-ink focus:outline-none focus:border-gold"
        />
      </div>

      <button type="submit" disabled={status.state === "loading"} className="btn-gold w-full sm:w-auto disabled:opacity-60">
        {status.state === "loading" ? "Sending…" : "Submit Booking Request"}
      </button>

      {status.state === "success" && (
        <p className="text-sm font-medium text-[#4d7c5f]">{status.message}</p>
      )}
      {status.state === "error" && (
        <p className="text-sm font-medium text-[#b3483f]">{status.message}</p>
      )}
    </form>
  );
}

function Field({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-gold-dark mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-gold/30 bg-white/60 px-4 py-3 text-sm text-ink focus:outline-none focus:border-gold"
      />
    </div>
  );
}
