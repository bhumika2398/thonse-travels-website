// Shared submission helper for Web3Forms (https://web3forms.com).
// Both BookingForm and ContactForm POST their data here as JSON instead of
// hitting the old /api/bookings and /api/contact Express endpoints.

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY = "58213d3d-7333-4f3f-bb55-50377c45d9c1";

/**
 * Submits a payload to Web3Forms as JSON.
 * @param {object} payload - form fields, expected to already include
 *   access_key, subject, and botcheck.
 * @returns {Promise<object>} the parsed JSON response.
 * @throws {Error} if the request fails or Web3Forms returns success: false.
 */
export async function submitToWeb3Forms(payload) {
  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data || data.success !== true) {
    const message = data?.message || "Something went wrong. Please call us directly.";
    throw new Error(message);
  }

  return data;
}
