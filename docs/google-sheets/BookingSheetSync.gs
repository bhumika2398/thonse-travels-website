/**
 * Booking Sheet Sync — Google Apps Script
 *
 * Receives each booking-form submission from the Thonse Tours and Travels
 * website and appends it as a new row in this spreadsheet.
 *
 * SETUP (do this once, in your own Google account):
 *   1. Create a new Google Sheet (or open the one you want bookings
 *      logged to) in your Drive.
 *   2. Extensions → Apps Script. Delete the placeholder code and paste
 *      this whole file in.
 *   3. Replace SHARED_SECRET below with a long random string — anything
 *      works, e.g. run `openssl rand -hex 16` locally, or mash the
 *      keyboard. This is NOT your Google password; it's just a shared
 *      token so random internet POSTs can't write junk rows into your
 *      sheet.
 *   4. Deploy → New deployment → gear icon → "Web app".
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Click Deploy, authorize when prompted, then copy the Web app URL
 *      (ends in /exec).
 *   5. Give the developer:
 *        - the /exec URL  → becomes VITE_SHEETS_WEBHOOK_URL
 *        - the same SHARED_SECRET string → becomes VITE_SHEETS_SECRET
 *      in the website's client/.env — no Google login/password is ever
 *      needed on the developer's end.
 *   6. Test: submit the booking form on the live site once, then check
 *      this spreadsheet for a new "Bookings" tab with a new row.
 *
 * Whenever you re-deploy this script after editing it, you must create a
 * NEW deployment (or "Manage deployments" → edit → new version) for the
 * change to actually take effect at the existing /exec URL.
 */

const SHARED_SECRET = "REPLACE_WITH_A_LONG_RANDOM_STRING";
const SHEET_NAME = "Bookings";

const COLUMNS = [
  "Submitted At",
  "Name",
  "Phone",
  "Email",
  "Vehicle",
  "Pickup Location",
  "Destination",
  "Travel Date",
  "Passengers",
  "Notes",
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.secret !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    const sheet = getOrCreateSheet();
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.vehicle || "",
      data.pickupLocation || "",
      data.destination || "",
      data.date || "",
      data.passengers || "",
      data.notes || "",
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
