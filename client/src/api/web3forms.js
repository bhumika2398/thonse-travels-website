// Submission helper for Web3Forms (https://web3forms.com).
// BookingForm POSTs its data here as JSON instead of hitting the old
// /api/bookings Express endpoint.

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY = "53e6742c-b394-4574-8006-e583471c22c4";

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
