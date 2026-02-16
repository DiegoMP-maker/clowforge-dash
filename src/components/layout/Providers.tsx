'use client';

import type { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps): React.ReactElement {
  return <>{children}</>;
}
