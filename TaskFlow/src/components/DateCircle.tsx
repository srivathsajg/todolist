import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, layout } from '../theme';
import { format } from 'date-fns';

interface DateCircleProps {
  date: Date;
  isSelected: boolean;
  onPress: () => void;
}

export const DateCircle = ({ date, isSelected, onPress }: DateCircleProps) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isSelected && styles.selectedContainer
      ]} 
      onPress={onPress}
    >
      <Text style={[styles.dayName, isSelected && styles.selectedText]}>
        {format(date, 'EEE')}
      </Text>
      <Text style={[styles.dayNumber, isSelected && styles.selectedText]}>
        {format(date, 'd')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 80,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: layout.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedContainer: {
    backgroundColor: colors.primary,
  },
  dayName: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  selectedText: {
    color: colors.white,
  }
});
