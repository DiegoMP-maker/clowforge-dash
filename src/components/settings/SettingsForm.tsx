'use client';

import { Input } from '@/components/ui/Input';
import { COPY } from '@/lib/copy';

type SettingsFormProps = {
  email: string;
  role: string;
};

export function SettingsForm({ email, role }: SettingsFormProps): React.ReactElement {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-900">{COPY.settings.tabs.account}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input label={COPY.settings.account.email} value={email} readOnly />
          <Input label={COPY.settings.account.role} value={role} readOnly />
        </div>
      </div>
    </div>
  );
}
