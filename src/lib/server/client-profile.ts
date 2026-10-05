import { env } from 'cloudflare:workers';

export type ClientProfile = {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  phone_e164: string | null;
  registration_code: string | null;
  questionnaire_status: 'NOT_RECEIVED' | 'RECEIVED' | 'REVIEWED';
  questionnaire_received_at: string | null;
  profile_completed_at: string | null;
  created_at: string;
  updated_at: string;
};

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

function toAsciiDigits(value: string): string {
  return value.replace(/[۰-۹٠-٩]/g, (digit) => {
    const p = PERSIAN_DIGITS.indexOf(digit);
    if (p >= 0) return String(p);
    const a = ARABIC_DIGITS.indexOf(digit);
    return String(a);
  });
}

function cleanName(value: string): string {
  return value
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .trim();
}

export function validatePersonName(value: string): string | null {
  const normalized = cleanName(value);

  if (normalized.length < 2 || normalized.length > 80) {
    return null;
  }

  // Unicode letters/marks, spaces, Persian ZWNJ, hyphen and apostrophe.
  if (!/^[\p{L}\p{M}\s\u200c'-]+$/u.test(normalized)) {
    return null;
  }

  return normalized;
}

export function normalizePhoneE164(
  countryCodeInput: string,
  phoneInput: string,
): string | null {
  let countryCode = toAsciiDigits(countryCodeInput).trim();
  let phone = toAsciiDigits(phoneInput).trim();

  // Remove visual separators only.
  countryCode = countryCode.replace(/[\s().-]/g, '');
  phone = phone.replace(/[\s().-]/g, '');

  // Accept a full international number entered directly.
  if (phone.startsWith('00')) {
    phone = `+${phone.slice(2)}`;
  }

  if (phone.startsWith('+')) {
    if (!/^\+[1-9]\d{6,14}$/.test(phone)) return null;
    return phone;
  }

  if (countryCode.startsWith('00')) {
    countryCode = `+${countryCode.slice(2)}`;
  }

  if (!countryCode.startsWith('+')) {
    countryCode = `+${countryCode}`;
  }

  if (!/^\+[1-9]\d{0,2}$/.test(countryCode)) {
    return null;
  }

  // National numbers are commonly entered with a trunk-prefix zero.
  phone = phone.replace(/^0+/, '');

  if (!/^\d{4,14}$/.test(phone)) {
    return null;
  }

  const e164 = `${countryCode}${phone}`;

  // E.164 permits a maximum of 15 digits after "+".
  if (!/^\+[1-9]\d{6,14}$/.test(e164)) {
    return null;
  }

  return e164;
}

export function isClientProfileComplete(
  profile: ClientProfile | null,
): boolean {
  return Boolean(
    profile?.first_name &&
      profile?.last_name &&
      profile?.phone_e164 &&
      profile?.profile_completed_at,
  );
}

export async function getClientProfile(
  userId: string,
): Promise<ClientProfile | null> {
  return env.DB
    .prepare(
      `SELECT
         id,
         user_id,
         first_name,
         last_name,
         phone_e164,
         registration_code,
         questionnaire_status,
         questionnaire_received_at,
         profile_completed_at,
         created_at,
         updated_at
       FROM client_profiles
       WHERE user_id = ?
       LIMIT 1`,
    )
    .bind(userId)
    .first<ClientProfile>();
}

export async function completeClientProfile(input: {
  userId: string;
  firstName: string;
  lastName: string;
  phoneE164: string;
}): Promise<void> {
  const now = new Date().toISOString();

  await env.DB
    .prepare(
      `UPDATE client_profiles
       SET
         first_name = ?,
         last_name = ?,
         phone_e164 = ?,
         profile_completed_at = COALESCE(profile_completed_at, ?),
         updated_at = ?
       WHERE user_id = ?`,
    )
    .bind(
      input.firstName,
      input.lastName,
      input.phoneE164,
      now,
      now,
      input.userId,
    )
    .run();
}
