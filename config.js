// This file contains application-wide configuration.

// IMPORTANT: You must create a Google Cloud project and get a Client ID for Google Sign-In to work.
// Create a file named .env.local and add your Google Client ID like this:
// GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID_HERE"
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE";

/**
 * The maximum number of campaigns a user can create on the free plan.
 */
export const MAX_CAMPAIGNS = 5;

/**
 * The maximum number of story generations (new or continuations) a user can perform per day.
 */
export const MAX_DAILY_PROMPTS = 20;