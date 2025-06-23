import { useState } from 'react';
import { View, Text, TextInput, Image, Pressable, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../../lib/supabase'

import { styles } from '@/styles/styles-signup';
import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';


export default function Signup() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      Alert.alert('Error', error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.replace('/');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.gray[900] }}>
      
    <View style={styles.container}>

      <Pressable>
        <MaterialIcons 
        name="arrow-back" 
        style={styles.backbutton} 
        onPress={() => router.back()} 
        />
      </Pressable>
      

        <Image
        source={require('@/assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />


      <Text style={styles.title}>Criar uma conta</Text>

      <TextInput
        placeholder="Digite seu nome completo"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Digite seu e-mail..."
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
      />

      <TextInput
        placeholder="Digite sua senha..."
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>
        {loading ? 'Carregando...' : 'Cadastrar'}
        </Text>
      </Pressable>
      
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
    
    
  );
}