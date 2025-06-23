import { useState } from 'react';
import { View, Text, TextInput, Image, Pressable, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';

import { styles } from '@/styles/styles-login';
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { colors } from '@/constants/colors';

export default function LoginScreen() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);

   async function handleSignIn() {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Error', error.message);
      setLoading(false);
      return;
   }

   setLoading(false);
   router.replace('/home/page');

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.gray[900] }}>
    <View style={styles.container}>

        <Image
        source={require('@/assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Digite seu e-mail"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        autoCorrect={false}
        spellCheck={false}
      />

      <TextInput
        placeholder="Digite sua senha"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>
          {loading ? 'Carregando...' : 'Acessar'}
          </Text>
      </Pressable>

      <Link
        href={"/(auth)/signup/page"}
        style={styles.link}
      >
          <Text>
            Ainda não tem uma conta? Cadastre-se
          </Text>
      </Link>
      
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
    
  );
}