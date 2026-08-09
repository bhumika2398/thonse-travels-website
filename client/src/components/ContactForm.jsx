import { useState } from "react";
import { createContact } from "../api/client.js";

const initialState = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const res = await createContact(form);
      setStatus({ state: "success", message: res.message || "Message sent!" });
      setForm(initialState);
    } catch (err) {
      setStatus({
        state: "error",
        message: err?.response?.data?.message || "Something went wrong. Please call us directly.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-7 sm:p-9 space-y-5">
      <h3 className="font-display text-2xl font-semibold text-ink">Send Us a Message</h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold-dark mb-1.5">
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gold/30 bg-white/60 px-4 py-3 text-sm text-ink focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold-dark mb-1.5">
            Phone
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-gold/30 bg-white/60 px-4 py-3 text-sm text-ink focus:outline-none focus:border-gold"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold-dark mb-1.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gold/30 bg-white/60 px-4 py-3 text-sm text-ink focus:outline-none focus:border-gold"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold-dark mb-1.5">
            Subject
          </label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="e.g. Package enquiry, feedback, group booking…"
            className="w-full rounded-xl border border-gold/30 bg-white/60 px-4 py-3 text-sm text-ink focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gold-dark mb-1.5">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-xl border border-gold/30 bg-white/60 px-4 py-3 text-sm text-ink focus:outline-none focus:border-gold"
        />
      </div>

      <button type="submit" disabled={status.state === "loading"} className="btn-gold w-full sm:w-auto disabled:opacity-60">
        {status.state === "loading" ? "Sending…" : "Send Message"}
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
