import { COPY } from './copy';

export type NavItem = {
  label: string;
  href: string;
  icon?: string;
};

export const appNav: NavItem[] = [
  { label: 'Dashboard', href: '/' },
  { label: COPY.nav.projects, href: '/projects' },
  { label: COPY.nav.runs, href: '/runs' },
  { label: COPY.nav.costs, href: '/costs' },
  { label: COPY.nav.health, href: '/health' },
  { label: COPY.nav.settings, href: '/settings' },
];

export const footerNav: Record<string, { label: string; href: string }[]> = {};
