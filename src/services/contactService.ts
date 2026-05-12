/**
 * Contact Service - Handles form submission to Google Sheets
 */
import { API_CONFIG } from '../config/api';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  message: string;
}

export interface SubmitResult {
  success: boolean;
  message: string;
}

/**
 * Submit contact form data to Google Sheets via Apps Script
 */
export const submitContactForm = async (
  data: ContactFormData,
): Promise<SubmitResult> => {
  try {
    const response = await fetch(API_CONFIG.GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Thank you! Your message has been sent successfully.',
      };
    }

    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
};

/**
 * Validates contact form fields
 */
export const validateContactForm = (
  data: Partial<ContactFormData>,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!data.phone?.trim()) {
    errors.phone = 'Phone number is required';
  }

  if (!data.message?.trim()) {
    errors.message = 'Message is required';
  }

  return errors;
};
