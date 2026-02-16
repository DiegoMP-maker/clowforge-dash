'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { COPY } from '@/lib/copy';
import { useAuth } from '@/hooks/use-auth';

export function Header(): React.ReactElement {
  const { signOut } = useAuth();

  function handleSignOut(): void {
    signOut().then(() => {
      window.location.href = '/login';
    });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-base font-semibold text-neutral-900">
          {COPY.auth.login.title}
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
