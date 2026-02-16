import { redirect } from 'next/navigation';

import { SettingsForm } from '@/components/settings/SettingsForm';
import { COPY } from '@/lib/copy';
import { createServerClient } from '@/lib/supabase/server';

export default async function SettingsPage() {
  const supabase = await createServerClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    redirect('/login');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-900">{COPY.settings.title}</h1>
      <SettingsForm
        email={auth.user.email ?? ''}
        role="admin"
      />
    </div>
  );
}
