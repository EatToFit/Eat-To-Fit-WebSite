import { getAdminActorByAuthProviderId } from '@/lib/server/admin';

export async function requireActiveAdmin(Astro: any) {
  const { isAuthenticated, userId } = Astro.locals.auth();

  if (!isAuthenticated || !userId) {
    return {
      ok: false as const,
      response: Astro.redirect('/sign-in'),
    };
  }

  const actor = await getAdminActorByAuthProviderId(userId);

  if (!actor) {
    return {
      ok: false as const,
      response: new Response('Forbidden', { status: 403 }),
    };
  }

  return {
    ok: true as const,
    actor,
  };
}

export function isSameOriginPost(Astro: any): boolean {
  const origin = Astro.request.headers.get('origin');
  return !origin || origin === Astro.url.origin;
}
