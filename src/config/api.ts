/**
 * API Configuration
 * Replace the GOOGLE_SHEETS_URL with your deployed Google Apps Script URL
 */
export const API_CONFIG = {
  /**
   * Google Sheets Web App URL
   * To set up:
   * 1. Create a Google Sheet with headers: Timestamp | Name | Email | Phone | Company | Country | Message
   * 2. Go to Extensions → Apps Script
   * 3. Paste the script from the README
   * 4. Deploy as Web App (Execute as: Me, Access: Anyone)
   * 5. Copy the deployment URL here
   */
  GOOGLE_SHEETS_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
} as const;
