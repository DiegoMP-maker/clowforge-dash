'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { appNav } from '@/lib/navigation';

type MobileNavProps = {
  maxItems?: number;
};

export function MobileNav({ maxItems = 5 }: MobileNavProps): React.ReactElement {
  const pathname = usePathname();
  const items = appNav.slice(0, maxItems);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium transition-colors',
                isActive ? 'text-primary-600' : 'text-neutral-500',
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
