import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, layout } from '../theme';
import { useTaskStore } from '../store/useTaskStore';

export const AnalyticsScreen = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Simple mock chart data
  const chartData = [40, 60, 80, 50, 90, 70, 100];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <LinearGradient colors={[colors.primaryLight, colors.background]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Analytics</Text>
        
        {/* Main Stat */}
        <View style={styles.mainCard}>
          <Text style={styles.mainTitle}>Completion Rate</Text>
          <View style={styles.circleGraph}>
            <Text style={styles.percentageText}>{rate}%</Text>
          </View>
          <Text style={styles.mainSubtitle}>{completed} of {total} tasks completed</Text>
        </View>

        {/* Chart Card */}
        <Text style={styles.sectionTitle}>Daily Productivity</Text>
        <View style={styles.chartCard}>
          <View style={styles.chartContainer}>
            {chartData.map((val, idx) => (
              <View key={idx} style={styles.barCol}>
                <View style={[styles.bar, { height: `${val}%` }]} />
                <Text style={styles.dayText}>{days[idx]}</Text>
              </View>
            ))}
          </View>
        </View>
        
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 80,
    paddingHorizontal: layout.spacing.lg,
    paddingBottom: 100,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: layout.spacing.xl,
  },
  mainCard: {
    backgroundColor: colors.white,
    borderRadius: layout.radius.large,
    padding: layout.spacing.xl,
    alignItems: 'center',
    marginBottom: layout.spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  mainTitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: layout.spacing.lg,
  },
  circleGraph: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 12,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: layout.spacing.lg,
  },
  percentageText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  mainSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  chartCard: {
    backgroundColor: colors.white,
    borderRadius: layout.radius.large,
    padding: layout.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    paddingTop: 20,
  },
  barCol: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginBottom: layout.spacing.sm,
  },
  dayText: {
    fontSize: 12,
    color: colors.textLight,
  }
});
