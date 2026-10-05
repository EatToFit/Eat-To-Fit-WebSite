import { env } from 'cloudflare:workers';

export type DashboardPlan = {
  public_id: string;
  title: string;
  version: number;
  published_at: string | null;
};

export type DashboardSummary = {
  currentPlan: DashboardPlan | null;
  previousPlansCount: number;
};

export async function getDashboardSummary(
  userId: string,
): Promise<DashboardSummary> {
  const [currentPlan, previousPlans] = await Promise.all([
    env.DB
      .prepare(
        `SELECT public_id, title, version, published_at
         FROM meal_plans
         WHERE user_id = ?
           AND status = 'PUBLISHED'
           AND is_current = 1
         ORDER BY published_at DESC, created_at DESC
         LIMIT 1`,
      )
      .bind(userId)
      .first<DashboardPlan>(),

    env.DB
      .prepare(
        `SELECT COUNT(*) AS total
         FROM meal_plans
         WHERE user_id = ?
           AND status IN ('PUBLISHED', 'ARCHIVED')
           AND is_current = 0`,
      )
      .bind(userId)
      .first<{ total: number }>(),
  ]);

  return {
    currentPlan: currentPlan ?? null,
    previousPlansCount: Number(previousPlans?.total ?? 0),
  };
}
