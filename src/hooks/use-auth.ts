'use client';

import type { User } from '@supabase/supabase-js';
import { useEffect, useMemo, useState } from 'react';

import { createBrowserClient } from '@/lib/supabase/client';

type AuthState = {
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = useMemo(() => createBrowserClient(), []);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  async function signOut(): Promise<void> {
    await supabase.auth.signOut();
    setUser(null);
  }

  return { user, isLoading, signOut };
}
