import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Task } from '../types';
import { colors, layout } from '../theme';
import { CircleCheck, Circle, MoreVertical, Briefcase, User, BookOpen, PenTool, Heart } from 'lucide-react-native';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
}

const CategoryIcon = ({ category }: { category: string }) => {
  const props = { size: 20, color: colors.white };
  switch(category) {
    case 'Work': return <Briefcase {...props} />;
    case 'Personal': return <User {...props} />;
    case 'Study': return <BookOpen {...props} />;
    case 'Design': return <PenTool {...props} />;
    case 'Health': return <Heart {...props} />;
    default: return <Briefcase {...props} />;
  }
};

export const TaskCard = ({ task, onPress, onToggle }: TaskCardProps) => {
  const priorityColor = colors.priority[task.priority] || colors.primary;

  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: priorityColor }]}>
        <CategoryIcon category={task.category} />
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, task.completed && styles.completedText]}>
          {task.title}
        </Text>
        <Text style={styles.timeText}>
          {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {task.category}
        </Text>
      </View>

      <TouchableOpacity onPress={onToggle} style={styles.actionButton}>
        {task.completed ? (
          <CircleCheck size={24} color={colors.success} />
        ) : (
          <Circle size={24} color={colors.textLight} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: layout.radius.medium,
    padding: layout.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: layout.spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.textLight,
  },
  timeText: {
    fontSize: 13,
    color: colors.textLight,
  },
  actionButton: {
    padding: layout.spacing.xs,
  }
});
