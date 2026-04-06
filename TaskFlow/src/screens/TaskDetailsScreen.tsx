import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Trash2 } from 'lucide-react-native';
import { colors, layout } from '../theme';
import { useTaskStore } from '../store/useTaskStore';

export const TaskDetailsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { taskId } = route.params;
  const { tasks, deleteTask } = useTaskStore();
  
  const task = tasks.find(t => t.id === taskId);

  if (!task) return null;

  return (
    <LinearGradient colors={[colors.primaryLight, colors.background]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        <TouchableOpacity 
          onPress={() => {
            deleteTask(task.id);
            navigation.goBack();
          }} 
          style={styles.backBtn}
        >
          <Trash2 size={24} color={colors.error} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={[styles.priorityBadge, { backgroundColor: colors.priority[task.priority] }]}>
          <Text style={styles.badgeText}>{task.priority.toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.category}>{task.category}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.descTitle}>Description</Text>
        <Text style={styles.description}>{task.description || 'No description provided.'}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: layout.spacing.lg,
    paddingBottom: layout.spacing.md,
  },
  backBtn: { padding: layout.spacing.xs },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.text },
  card: {
    backgroundColor: colors.white,
    margin: layout.spacing.lg,
    padding: layout.spacing.xl,
    borderRadius: layout.radius.large,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: layout.spacing.md,
    paddingVertical: 4,
    borderRadius: layout.radius.full,
    marginBottom: layout.spacing.md,
  },
  badgeText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: 8 },
  category: { fontSize: 16, color: colors.textLight, marginBottom: layout.spacing.lg },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: layout.spacing.lg },
  descTitle: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 8 },
  description: { fontSize: 16, color: colors.textLight, lineHeight: 24 },
});
