/**
 * Google Apps Script for GOOGLE_SHEETS_WEBHOOK_URL.
 *
 * Sheet header row (exactly):
 * Full Name | Email | Phone | Country | Current Status | Visa Status | Year Of Experience
 *
 * Deploy:
 * 1. Extensions → Apps Script → paste this file
 * 2. Deploy → New deployment → type: Web app
 * 3. Execute as: Me
 * 4. Who has access: Anyone   ← must be "Anyone" (not "Anyone in [org]")
 * 5. Copy the /exec URL into GOOGLE_SHEETS_WEBHOOK_URL
 *
 * Phone is written as text so +country-code values do not become #ERROR!.
 */

function doPost(e) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Webinar Registrations') ||
    SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const data = JSON.parse(e.postData.contents || '{}');
  const phone = String(data.phone || '');
  // Force text cell so leading + is kept and Sheets does not show formula errors
  const phoneCell = phone ? `'${phone.replace(/^'/, '')}` : '';

  sheet.appendRow([
    data.fullName || '',
    data.email || '',
    phoneCell,
    data.country || '',
    data.currentStatus || '',
    data.visaStatus || '',
    data.yearOfExperience || '',
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON
  );
}

/** Optional browser check — open the /exec URL in an incognito window. */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: 'Webinar Sheets webhook is live. Use POST.' })
  ).setMimeType(ContentService.MimeType.JSON);
}
