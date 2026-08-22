// Optional booking-log integration: POSTs a copy of each booking-form
// submission to a Google Sheet via an Apps Script Web App, so the owner
// can see bookings land in a spreadsheet immediately — independent of the
// Web3Forms email flow in BookingForm.jsx.
//
// Setup: see docs/google-sheets/BookingSheetSync.gs for the Apps Script
// to deploy, then set VITE_SHEETS_WEBHOOK_URL and VITE_SHEETS_SECRET in
// client/.env to the values it gives you.

const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL;
const SHEETS_SECRET = import.meta.env.VITE_SHEETS_SECRET;

/**
 * Fire-and-forget: logs a booking to the connected Google Sheet.
 *
 * Never throws and is never awaited by the caller — a Sheets outage or a
 * missing/misconfigured webhook must not block or surface an error on the
 * actual booking submission, which has already succeeded via Web3Forms
 * by the time this runs. If VITE_SHEETS_WEBHOOK_URL isn't set (e.g. local
 * dev, or before the site owner finishes the one-time Apps Script setup),
 * this is a silent no-op.
 */
export function logBookingToSheet(payload) {
  if (!WEBHOOK_URL) return;

  fetch(WEBHOOK_URL, {
    method: "POST",
    // text/plain avoids a CORS preflight (OPTIONS) request — Apps Script
    // web apps don't handle preflight, so a JSON content-type here would
    // make every submission silently fail.
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...payload, secret: SHEETS_SECRET }),
  }).catch(() => {
    // Silently ignore — the booking itself already succeeded.
  });
}
