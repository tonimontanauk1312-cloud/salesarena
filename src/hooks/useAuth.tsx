
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Устанавливаем слушатель изменений авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // При входе нового пользователя обновляем его профиль с ролью
        if (event === 'SIGNED_IN' && session?.user) {
          const role = session.user.user_metadata?.role;
          if (role) {
            console.log('User signed in with role:', role);
            
            // Небольшая задержка для завершения создания профиля
            setTimeout(async () => {
              try {
                const { error } = await supabase
                  .from('profiles')
                  .update({ role: role })
                  .eq('id', session.user.id);
                
                if (error) {
                  console.error('Error updating user role:', error);
                } else {
                  console.log('User role updated successfully:', role);
                }
              } catch (err) {
                console.error('Error in role update:', err);
              }
            }, 1000);
          }
        }
      }
    );

    // Проверяем текущую сессию
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
