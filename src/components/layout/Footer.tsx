import { COPY } from '@/lib/copy';

export function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-neutral-200 bg-white py-4 text-center text-xs text-neutral-500">
      {COPY.auth.login.title}
    </footer>
  );
}
