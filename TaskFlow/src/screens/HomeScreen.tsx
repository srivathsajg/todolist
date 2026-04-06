import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus } from 'lucide-react-native';
import { format, addDays } from 'date-fns';
import { AppHeader } from '../components/AppHeader';
import { DateCircle } from '../components/DateCircle';
import { TaskCard } from '../components/TaskCard';
import { useTaskStore } from '../store/useTaskStore';
import { colors, layout } from '../theme';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { tasks, toggleTaskCompletion } = useTaskStore();

  const dates = Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i));

  // Filter tasks roughly by day (ignoring hours)
  const filteredTasks = tasks.filter(task => {
    const tDate = new Date(task.dueDate);
    return tDate.getDate() === selectedDate.getDate() && tDate.getMonth() === selectedDate.getMonth();
  });

  return (
    <LinearGradient colors={[colors.primaryLight, colors.background]} style={styles.container}>
      <AppHeader title="Task Schedule" />
      
      <View style={styles.datesSection}>
        <View style={styles.dateHeaderRow}>
          <Text style={styles.sectionTitle}>{format(selectedDate, 'MMMM yyyy')}</Text>
          <View style={styles.todayPill}>
            <Text style={styles.todayText}>Today</Text>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.datesScroll}
        >
          {dates.map((date, index) => (
            <DateCircle
              key={index}
              date={date}
              isSelected={date.getDate() === selectedDate.getDate()}
              onPress={() => setSelectedDate(date)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.tasksSection}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.tasksScroll}
        >
          {filteredTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No tasks for this day. Enjoy your free time!</Text>
            </View>
          ) : (
            filteredTasks.map(task => (
              <TaskCard 
                key={task.id}
                task={task}
                onPress={() => navigation.navigate('TaskDetails', { taskId: task.id })}
                onToggle={() => toggleTaskCompletion(task.id)}
              />
            ))
          )}
        </ScrollView>
      </View>

      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.9}
        onPress={() => navigation.navigate('AddTask')}
      >
        <LinearGradient
          colors={[colors.primary, '#82C1E6']}
          style={styles.fabGradient}
        >
          <Plus size={32} color={colors.white} />
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  datesSection: {
    marginBottom: layout.spacing.lg,
  },
  dateHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.lg,
    marginBottom: layout.spacing.md,
  },
  todayPill: {
    backgroundColor: colors.white,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.xs,
    borderRadius: layout.radius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  todayText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  datesScroll: {
    paddingHorizontal: layout.spacing.lg,
    paddingBottom: layout.spacing.sm,
  },
  tasksSection: {
    flex: 1,
    paddingHorizontal: layout.spacing.lg,
  },
  tasksScroll: {
    paddingTop: layout.spacing.md,
    paddingBottom: 100, // For FAB
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  fabGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: colors.textLight,
    fontSize: 16,
  }
});
