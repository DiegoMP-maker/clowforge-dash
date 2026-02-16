'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { COPY } from '@/lib/copy';

const LABELS: Record<string, string> = {
  projects: COPY.nav.projects,
  runs: COPY.nav.runs,
  costs: COPY.nav.costs,
  health: COPY.nav.health,
  settings: COPY.nav.settings,
};

export function Breadcrumbs(): React.ReactElement | null {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((segment, index) => ({
    href: '/' + segments.slice(0, index + 1).join('/'),
    label: LABELS[segment] ?? segment,
    isLast: index === segments.length - 1,
  }));

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-neutral-500">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="hover:text-neutral-700">
            {COPY.nav.projects}
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {crumb.isLast ? (
              <span className="font-medium text-neutral-900">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-neutral-700">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
