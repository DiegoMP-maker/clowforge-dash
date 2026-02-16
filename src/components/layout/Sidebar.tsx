'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { appNav } from '@/lib/navigation';

type SidebarProps = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export function Sidebar({ header, footer }: SidebarProps): React.ReactElement {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-neutral-200 bg-white lg:block">
      <div className="flex h-full flex-col gap-y-5 overflow-y-auto px-6 py-4">
        {header}
        <nav className="flex-1 space-y-1" aria-label="Sidebar">
          {appNav.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        {footer}
      </div>
    </aside>
  );
}
