import { useRef, useState } from "react";
import { submitToWeb3Forms, WEB3FORMS_ACCESS_KEY } from "../api/web3forms.js";

const CONTACT_SUBJECT = "New Contact Message - Thonse Tours and Travels";

// Note: the visitor-facing "Subject" field is bound to visitor_subject, not
// "subject" — Web3Forms reserves the "subject" key to set the email's
// subject line, which we pin to CONTACT_SUBJECT below.
const initialState = { name: "", email: "", phone: "", visitor_subject: "", message: "" };

const FIELD_CLASS =
  "field-input w-full rounded-xl border border-gold/30 bg-white/60 px-4 py-3 text-sm text-ink";

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const botcheckRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: if this hidden checkbox got checked, silently drop the submission.
    if (botcheckRef.current?.checked) {
      return;
    }

    setStatus({ state: "loading", message: "" });
    try {
      const res = await submitToWeb3Forms({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: CONTACT_SUBJECT,
        botcheck: false,
        ...form,
      });
      setStatus({ state: "success", message: res.message || "Message sent!" });
      setForm(initialState);
    } catch (err) {
      setStatus({
        state: "error",
        message: err?.message || "Something went wrong. Please call us directly.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-light rounded-3xl p-7 sm:p-9 space-y-5">
      <h3 className="font-display text-2xl font-semibold text-ink">Send Us a Message</h3>

      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <input type="hidden" name="subject" value={CONTACT_SUBJECT} />
      <input type="checkbox" name="botcheck" ref={botcheckRef} tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

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
            className={FIELD_CLASS}
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
            className={FIELD_CLASS}
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
            className={FIELD_CLASS}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold-dark mb-1.5">
            Subject
          </label>
          <input
            name="visitor_subject"
            value={form.visitor_subject}
            onChange={handleChange}
            placeholder="e.g. Package enquiry, feedback, group booking…"
            className={FIELD_CLASS}
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
          className={FIELD_CLASS}
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
