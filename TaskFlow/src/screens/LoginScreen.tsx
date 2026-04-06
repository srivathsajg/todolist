import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, layout } from '../theme';
import { GradientButton } from '../components/GradientButton';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <LinearGradient colors={[colors.primaryLight, colors.background]} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue your TaskFlow</Text>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor={colors.textLight} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            secureTextEntry 
            placeholderTextColor={colors.textLight} 
          />
        </View>

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <GradientButton 
          title="Sign In" 
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Main' }] })} 
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: layout.spacing.xl, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: '800', color: colors.text, marginBottom: layout.spacing.xs },
  subtitle: { fontSize: 16, color: colors.textLight, marginBottom: 40 },
  inputContainer: { gap: layout.spacing.md, marginBottom: layout.spacing.md },
  input: {
    backgroundColor: colors.white,
    padding: layout.spacing.lg,
    borderRadius: layout.radius.medium,
    fontSize: 16,
    color: colors.text,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 40 },
  forgotText: { color: colors.primary, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
  footerText: { color: colors.textLight },
  signupText: { color: colors.primary, fontWeight: '700' }
});
