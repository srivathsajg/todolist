import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, layout } from '../theme';
import { GradientButton } from '../components/GradientButton';

const { width } = Dimensions.get('window');

export const OnboardingScreen = () => {
  const navigation = useNavigation<any>();
  const [step, setStep] = useState(0);

  const slides = [
    { title: 'Manage Tasks', subtitle: 'Organize your daily tasks beautifully.' },
    { title: 'Track Progress', subtitle: 'Watch your productivity grow over time.' },
    { title: 'Stay Focused', subtitle: 'Never miss an important deadline again.' },
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <LinearGradient colors={[colors.primaryLight, colors.background]} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imagePlaceholder} />
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{slides[step].title}</Text>
          <Text style={styles.subtitle}>{slides[step].subtitle}</Text>
        </View>

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, step === i && styles.activeDot]} />
          ))}
        </View>

        <GradientButton 
          title={step === slides.length - 1 ? "Get Started" : "Next"} 
          onPress={handleNext} 
          style={styles.button}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: layout.spacing.xl, justifyContent: 'flex-end', paddingBottom: 60 },
  imagePlaceholder: { flex: 1, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: layout.radius.large, marginBottom: 40 },
  textContainer: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: layout.spacing.sm },
  subtitle: { fontSize: 16, color: colors.textLight, textAlign: 'center' },
  dots: { flexDirection: 'row', justifyContent: 'center', marginBottom: 40 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border, marginHorizontal: 4 },
  activeDot: { width: 24, backgroundColor: colors.primary },
  button: { width: '100%' }
});
