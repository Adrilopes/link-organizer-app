import { Stack, router } from 'expo-router';
import { colors } from "@/constants/colors";
import { AuthProvider, useAuth } from '@/contexts/AuthContext'; 
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

 function MainLayout() {
  const { setAuth } = useAuth()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if(session){
        setAuth(session.user);
        router.replace('/home/page');
        return;
      }

      setAuth(null);
      router.replace('/');
    })
  }, []);
  
  const backgroundColor = colors.gray[950];
  return (
  <Stack>
  <Stack.Screen
   name="index"
   options={{
    headerShown: false,
    contentStyle: { backgroundColor },
  }}
  />

  <Stack.Screen
   name="(auth)/signup/page"
   options={{
    headerShown: false,
    contentStyle: { backgroundColor },
  }}
  />

  <Stack.Screen
   name="home/page"
   options={{
    headerShown: false,
    contentStyle: { backgroundColor },
  }}
  />

  <Stack.Screen
   name="add/page"
   options={{
    headerShown: false,
    contentStyle: { backgroundColor },
  }}
  />
  
  </Stack>
  );
}

