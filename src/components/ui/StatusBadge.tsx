import { CheckCircle, Clock, Loader2, XCircle, Ban, Rocket, Palette, Hammer, Eye, Upload, Globe } from 'lucide-react';

import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  status: string;
  size?: 'sm' | 'md';
  showIcon?: boolean;
};

const statusStyles: Record<string, string> = {
  pending: 'bg-neutral-100 text-neutral-700',
  running: 'bg-accent-100 text-accent-700',
  completed: 'bg-secondary-100 text-secondary-700',
  failed: 'bg-error-light text-error-dark',
  cancelled: 'bg-neutral-200 text-neutral-600',
  // Project phases
  plan: 'bg-accent-100 text-accent-700',
  assets: 'bg-warning-light text-warning-dark',
  build: 'bg-info-light text-info-dark',
  review: 'bg-primary-100 text-primary-700',
  deploy: 'bg-secondary-100 text-secondary-700',
  done: 'bg-secondary-100 text-secondary-700',
  built: 'bg-info-light text-info-dark',
  'deployed-prod': 'bg-secondary-100 text-secondary-700',
  'deployed-preview': 'bg-accent-100 text-accent-700',
};

const statusIcons: Record<string, React.ElementType> = {
  pending: Clock,
  running: Loader2,
  completed: CheckCircle,
  failed: XCircle,
  cancelled: Ban,
  plan: Rocket,
  assets: Palette,
  build: Hammer,
  review: Eye,
  deploy: Upload,
  done: CheckCircle,
  built: Hammer,
  'deployed-prod': Globe,
  'deployed-preview': Globe,
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  running: 'Running',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
  plan: 'Planning',
  assets: 'Assets',
  build: 'Building',
  review: 'Review',
  deploy: 'Deploy',
  done: 'Done',
  built: 'Built',
  'deployed-prod': 'Production',
  'deployed-preview': 'Preview',
};

export function StatusBadge({ status, size = 'md', showIcon = true }: StatusBadgeProps) {
  const Icon = statusIcons[status] ?? Clock;
  const style = statusStyles[status] ?? 'bg-neutral-100 text-neutral-700';
  const label = statusLabels[status] ?? status;

  return (
    <span
      role="status"
      aria-live="polite"
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
        style,
      )}
    >
      {showIcon ? (
        <Icon
          className={cn('h-3.5 w-3.5', status === 'running' && 'animate-spin')}
          aria-hidden="true"
        />
      ) : null}
      {label}
    </span>
  );
}
