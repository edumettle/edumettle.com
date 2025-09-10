import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GSHEET_CLIENT_EMAIL,
    private_key: process.env.GSHEET_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  goals: string;
  courseId: string;
  courseTitle: string;
  paymentId?: string;
  paymentStatus?: string;
  amount?: string;
  timestamp: string;
}

export async function addContactToSheet(data: ContactFormData) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GSHEET_SPREADSHEET_ID,
      range: `${process.env.GSHEET_SHEET_CONTACT}!A:F`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.name,
          data.email,
          data.phone,
          data.message,
          data.timestamp,
          'New'
        ]],
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error adding contact to sheet:', error);
    return { success: false, error: error };
  }
}

export async function addRegistrationToSheet(data: RegistrationFormData) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GSHEET_SPREADSHEET_ID,
      range: `${process.env.GSHEET_SHEET_REGISTRATION}!A:L`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.name,
          data.email,
          data.phone,
          data.experience,
          data.goals,
          data.courseId,
          data.courseTitle,
          data.paymentId || '',
          data.paymentStatus || 'Pending',
          data.amount || '',
          data.timestamp,
          'New'
        ]],
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error adding registration to sheet:', error);
    return { success: false, error: error };
  }
}

export async function updateRegistrationPayment(orderId: string, paymentId: string, status: string) {
  try {
    // First, get all data to find the row with this order ID (which should be in the receipt field)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GSHEET_SPREADSHEET_ID,
      range: `${process.env.GSHEET_SHEET_REGISTRATION}!A:L`,
    });

    const rows = response.data.values || [];
    // Look for the most recent row with empty payment ID (pending payment)
    let rowIndex = -1;
    for (let i = rows.length - 1; i >= 0; i--) {
      if (rows[i][7] === '' || rows[i][7] === 'Pending') {
        rowIndex = i;
        break;
      }
    }

    if (rowIndex === -1) {
      return { success: false, error: 'Registration not found' };
    }

    // Update both payment ID and status
    const updateResponse = await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GSHEET_SPREADSHEET_ID,
      range: `${process.env.GSHEET_SHEET_REGISTRATION}!H${rowIndex + 1}:I${rowIndex + 1}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[paymentId, status]],
      },
    });

    return { success: true, data: updateResponse.data };
  } catch (error) {
    console.error('Error updating payment status:', error);
    return { success: false, error: error };
  }
}
