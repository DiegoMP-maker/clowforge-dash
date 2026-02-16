'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { COPY } from '@/lib/copy';
import { createBrowserClient } from '@/lib/supabase/client';

export function AuthForm(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = useMemo(() => createBrowserClient(), []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      window.location.href = '/';
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : COPY.auth.login.invalid;
      setError(message.includes('Invalid login') ? COPY.auth.login.invalid : COPY.auth.login.network);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold text-neutral-900">{COPY.auth.login.title}</h1>
        <p className="text-sm text-neutral-500">{COPY.auth.login.subtitle}</p>
      </div>
      {error ? <div className="mb-4 rounded-md bg-error-light p-3 text-sm text-error-dark">{error}</div> : null}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          label={COPY.auth.login.emailLabel}
          placeholder={COPY.auth.login.emailPlaceholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          type="password"
          label={COPY.auth.login.passwordLabel}
          placeholder={COPY.auth.login.passwordPlaceholder}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={8}
        />
        <Button type="submit" className="w-full" loading={loading}>
          {loading ? COPY.actions.loading : COPY.auth.login.submit}
        </Button>
      </form>
    </div>
  );
}
