import { env } from 'cloudflare:workers';

export type AdminActor = {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN';
  account_status: 'ACTIVE';
};

export type AdminClientListItem = {
  id: string;
  username: string;
  email: string;
  account_status: 'PENDING' | 'ACTIVE' | 'SUSPENDED';
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  phone_e164: string | null;
  questionnaire_status: 'NOT_RECEIVED' | 'RECEIVED' | 'REVIEWED';
  profile_completed_at: string | null;
  meal_plan_count: number;
};

export type AdminClientDetail = AdminClientListItem & {
  registration_code: string | null;
  questionnaire_received_at: string | null;
  approved_at: string | null;
  suspended_at: string | null;
  updated_at: string;
};

export async function getAdminActorByAuthProviderId(
  authProviderId: string,
): Promise<AdminActor | null> {
  return env.DB
    .prepare(
      `SELECT id, username, email, role, account_status
       FROM users
       WHERE auth_provider_id = ?
         AND role = 'ADMIN'
         AND account_status = 'ACTIVE'
       LIMIT 1`,
    )
    .bind(authProviderId)
    .first<AdminActor>();
}

export async function listClients(
  query = '',
): Promise<AdminClientListItem[]> {
  const normalized = query.trim().toLowerCase();
  const like = `%${normalized}%`;

  const statement = normalized
    ? env.DB.prepare(
        `SELECT
           u.id,
           u.username,
           u.email,
           u.account_status,
           u.created_at,
           p.first_name,
           p.last_name,
           p.phone_e164,
           p.questionnaire_status,
           p.profile_completed_at,
           (
             SELECT COUNT(*)
             FROM meal_plans mp
             WHERE mp.user_id = u.id
           ) AS meal_plan_count
         FROM users u
         LEFT JOIN client_profiles p ON p.user_id = u.id
         WHERE u.role = 'CLIENT'
           AND (
             lower(u.username) LIKE ?
             OR lower(u.email) LIKE ?
             OR lower(COALESCE(p.first_name, '')) LIKE ?
             OR lower(COALESCE(p.last_name, '')) LIKE ?
             OR COALESCE(p.phone_e164, '') LIKE ?
           )
         ORDER BY
           CASE u.account_status
             WHEN 'PENDING' THEN 0
             WHEN 'ACTIVE' THEN 1
             ELSE 2
           END,
           u.created_at DESC`,
      ).bind(like, like, like, like, like)
    : env.DB.prepare(
        `SELECT
           u.id,
           u.username,
           u.email,
           u.account_status,
           u.created_at,
           p.first_name,
           p.last_name,
           p.phone_e164,
           p.questionnaire_status,
           p.profile_completed_at,
           (
             SELECT COUNT(*)
             FROM meal_plans mp
             WHERE mp.user_id = u.id
           ) AS meal_plan_count
         FROM users u
         LEFT JOIN client_profiles p ON p.user_id = u.id
         WHERE u.role = 'CLIENT'
         ORDER BY
           CASE u.account_status
             WHEN 'PENDING' THEN 0
             WHEN 'ACTIVE' THEN 1
             ELSE 2
           END,
           u.created_at DESC`,
      );

  const result = await statement.all<AdminClientListItem>();
  return result.results ?? [];
}

export async function getClientDetail(
  clientId: string,
): Promise<AdminClientDetail | null> {
  return env.DB
    .prepare(
      `SELECT
         u.id,
         u.username,
         u.email,
         u.account_status,
         u.created_at,
         u.updated_at,
         u.approved_at,
         u.suspended_at,
         p.first_name,
         p.last_name,
         p.phone_e164,
         p.registration_code,
         p.questionnaire_status,
         p.questionnaire_received_at,
         p.profile_completed_at,
         (
           SELECT COUNT(*)
           FROM meal_plans mp
           WHERE mp.user_id = u.id
         ) AS meal_plan_count
       FROM users u
       LEFT JOIN client_profiles p ON p.user_id = u.id
       WHERE u.id = ?
         AND u.role = 'CLIENT'
       LIMIT 1`,
    )
    .bind(clientId)
    .first<AdminClientDetail>();
}

async function writeAudit(input: {
  actorUserId: string;
  targetUserId: string;
  action: string;
  entityType: string;
  entityId: string | null;
}): Promise<void> {
  const id = `aud_${crypto.randomUUID().replaceAll('-', '')}`;
  const now = new Date().toISOString();

  await env.DB
    .prepare(
      `INSERT INTO audit_log (
         id,
         actor_user_id,
         target_user_id,
         action,
         entity_type,
         entity_id,
         created_at
       )
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      input.actorUserId,
      input.targetUserId,
      input.action,
      input.entityType,
      input.entityId,
      now,
    )
    .run();
}

export async function setClientAccountStatus(input: {
  actorUserId: string;
  clientId: string;
  status: 'ACTIVE' | 'SUSPENDED';
}): Promise<void> {
  const now = new Date().toISOString();

  if (input.status === 'ACTIVE') {
    await env.DB
      .prepare(
        `UPDATE users
         SET
           account_status = 'ACTIVE',
           approved_at = COALESCE(approved_at, ?),
           suspended_at = NULL,
           updated_at = ?
         WHERE id = ?
           AND role = 'CLIENT'`,
      )
      .bind(now, now, input.clientId)
      .run();

    await writeAudit({
      actorUserId: input.actorUserId,
      targetUserId: input.clientId,
      action: 'CLIENT_APPROVED',
      entityType: 'USER',
      entityId: input.clientId,
    });

    return;
  }

  await env.DB
    .prepare(
      `UPDATE users
       SET
         account_status = 'SUSPENDED',
         suspended_at = ?,
         updated_at = ?
       WHERE id = ?
         AND role = 'CLIENT'`,
    )
    .bind(now, now, input.clientId)
    .run();

  await writeAudit({
    actorUserId: input.actorUserId,
    targetUserId: input.clientId,
    action: 'CLIENT_SUSPENDED',
    entityType: 'USER',
    entityId: input.clientId,
  });
}

export async function setQuestionnaireStatus(input: {
  actorUserId: string;
  clientId: string;
  status: 'NOT_RECEIVED' | 'RECEIVED' | 'REVIEWED';
}): Promise<void> {
  const now = new Date().toISOString();

  await env.DB
    .prepare(
      `UPDATE client_profiles
       SET
         questionnaire_status = ?,
         questionnaire_received_at =
           CASE
             WHEN ? IN ('RECEIVED', 'REVIEWED')
               THEN COALESCE(questionnaire_received_at, ?)
             ELSE NULL
           END,
         updated_at = ?
       WHERE user_id = ?`,
    )
    .bind(input.status, input.status, now, now, input.clientId)
    .run();

  await writeAudit({
    actorUserId: input.actorUserId,
    targetUserId: input.clientId,
    action: `QUESTIONNAIRE_${input.status}`,
    entityType: 'CLIENT_PROFILE',
    entityId: input.clientId,
  });
}

export async function getAdminCounts(): Promise<{
  total: number;
  pending: number;
  active: number;
  suspended: number;
}> {
  const result = await env.DB
    .prepare(
      `SELECT
         COUNT(*) AS total,
         SUM(CASE WHEN account_status = 'PENDING' THEN 1 ELSE 0 END) AS pending,
         SUM(CASE WHEN account_status = 'ACTIVE' THEN 1 ELSE 0 END) AS active,
         SUM(CASE WHEN account_status = 'SUSPENDED' THEN 1 ELSE 0 END) AS suspended
       FROM users
       WHERE role = 'CLIENT'`,
    )
    .first<{
      total: number;
      pending: number | null;
      active: number | null;
      suspended: number | null;
    }>();

  return {
    total: Number(result?.total ?? 0),
    pending: Number(result?.pending ?? 0),
    active: Number(result?.active ?? 0),
    suspended: Number(result?.suspended ?? 0),
  };
}
