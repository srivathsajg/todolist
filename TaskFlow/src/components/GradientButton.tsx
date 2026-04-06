import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, layout } from '../theme';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  colors?: readonly [string, string, ...string[]];
}

export const GradientButton = ({ 
  title, 
  onPress, 
  style, 
  textStyle,
  colors: gradColors = [colors.primary, '#82C1E6'] as const
}: GradientButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.container, style]}>
      <LinearGradient
        colors={gradColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: layout.radius.large,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  gradient: {
    paddingVertical: layout.spacing.md,
    paddingHorizontal: layout.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  }
});
