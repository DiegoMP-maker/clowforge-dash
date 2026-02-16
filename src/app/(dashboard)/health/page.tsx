import { redirect } from 'next/navigation';

import { Card } from '@/components/ui/Card';
import { COPY } from '@/lib/copy';
import { createServerClient } from '@/lib/supabase/server';

export default async function HealthPage() {
  const supabase = await createServerClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    redirect('/login');
  }

  const { error } = await supabase.from('forge_projects').select('id').limit(1);
  const supabaseStatus = error ? 'degraded' : 'operational';
  const overallStatus = error ? COPY.health.status.degraded : COPY.health.status.operational;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">{COPY.health.title}</h1>
        <p className="text-sm text-neutral-600">{overallStatus}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <div className="text-sm font-medium text-neutral-900">{COPY.health.service.supabase}</div>
          <div className="mt-1 text-xs uppercase text-neutral-500">
            {supabaseStatus === 'operational'
              ? COPY.health.service.operational
              : COPY.health.service.degraded}
          </div>
        </Card>
        <Card>
          <div className="text-sm font-medium text-neutral-900">{COPY.health.service.vercel}</div>
          <div className="mt-1 text-xs uppercase text-neutral-500">{COPY.health.service.operational}</div>
        </Card>
        <Card>
          <div className="text-sm font-medium text-neutral-900">{COPY.health.service.openai}</div>
          <div className="mt-1 text-xs uppercase text-neutral-500">{COPY.health.service.operational}</div>
        </Card>
      </div>
      <Card>
        <h2 className="text-lg font-semibold text-neutral-900">{COPY.health.errors.title}</h2>
        <div className="mt-3 text-sm text-neutral-600">
          <div className="font-medium text-neutral-900">{COPY.health.errors.emptyTitle}</div>
          <div>{COPY.health.errors.emptyMessage}</div>
        </div>
      </Card>
    </div>
  );
}
