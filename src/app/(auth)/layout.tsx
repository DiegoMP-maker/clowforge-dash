import { COPY } from '@/lib/copy';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-neutral-400">
          {COPY.auth.login.title}
        </div>
        {children}
      </div>
    </div>
  );
}
