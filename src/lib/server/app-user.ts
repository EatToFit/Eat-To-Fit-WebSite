import { env } from 'cloudflare:workers';

type ClerkUserLike = {
  id: string;
  username: string | null;
  primaryEmailAddressId: string | null;
  emailAddresses: Array<{
    id: string;
    emailAddress: string;
  }>;
};

export type AppUser = {
  id: string;
  auth_provider_id: string;
  username: string;
  username_normalized: string;
  email: string;
  email_normalized: string;
  role: 'CLIENT' | 'ADMIN';
  account_status: 'PENDING' | 'ACTIVE' | 'SUSPENDED';
  created_at: string;
  updated_at: string;
};

function createId(prefix: 'usr' | 'prf'): string {
  return `${prefix}_${crypto.randomUUID().replaceAll('-', '')}`;
}

function normalizeUsername(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function getPrimaryEmail(user: ClerkUserLike): string {
  if (!user.primaryEmailAddressId) {
    throw new Error('VERIFIED_EMAIL_REQUIRED');
  }

  const primaryEmail = user.emailAddresses.find(
    (item) => item.id === user.primaryEmailAddressId,
  );

  if (!primaryEmail?.emailAddress) {
    throw new Error('VERIFIED_EMAIL_REQUIRED');
  }

  return primaryEmail.emailAddress;
}

export async function ensureApplicationUser(
  clerkUser: ClerkUserLike,
): Promise<AppUser> {
  const db = env.DB;

  if (!db) {
    throw new Error('D1_BINDING_UNAVAILABLE');
  }

  if (!clerkUser.username) {
    throw new Error('USERNAME_REQUIRED');
  }

  const existing = await db
    .prepare(
      `SELECT id, auth_provider_id, username, username_normalized,
              email, email_normalized, role, account_status,
              created_at, updated_at
       FROM users
       WHERE auth_provider_id = ?
       LIMIT 1`,
    )
    .bind(clerkUser.id)
    .first<AppUser>();

  if (existing) {
    return existing;
  }

  const username = clerkUser.username.trim();
  const usernameNormalized = normalizeUsername(username);
  const email = getPrimaryEmail(clerkUser);
  const emailNormalized = normalizeEmail(email);
  const now = new Date().toISOString();

  const userId = createId('usr');
  const profileId = createId('prf');

  try {
    await db.batch([
      db
        .prepare(
          `INSERT INTO users (
             id, auth_provider_id, username, username_normalized,
             email, email_normalized, role, account_status,
             created_at, updated_at
           )
           VALUES (?, ?, ?, ?, ?, ?, 'CLIENT', 'PENDING', ?, ?)`,
        )
        .bind(
          userId,
          clerkUser.id,
          username,
          usernameNormalized,
          email,
          emailNormalized,
          now,
          now,
        ),

      db
        .prepare(
          `INSERT INTO client_profiles (
             id, user_id, questionnaire_status, created_at, updated_at
           )
           VALUES (?, ?, 'NOT_RECEIVED', ?, ?)`,
        )
        .bind(profileId, userId, now, now),
    ]);
  } catch (error) {
    const racedUser = await db
      .prepare(
        `SELECT id, auth_provider_id, username, username_normalized,
                email, email_normalized, role, account_status,
                created_at, updated_at
         FROM users
         WHERE auth_provider_id = ?
         LIMIT 1`,
      )
      .bind(clerkUser.id)
      .first<AppUser>();

    if (racedUser) return racedUser;
    throw error;
  }

  const created = await db
    .prepare(
      `SELECT id, auth_provider_id, username, username_normalized,
              email, email_normalized, role, account_status,
              created_at, updated_at
       FROM users
       WHERE id = ?
       LIMIT 1`,
    )
    .bind(userId)
    .first<AppUser>();

  if (!created) {
    throw new Error('APPLICATION_USER_CREATION_FAILED');
  }

  return created;
}
