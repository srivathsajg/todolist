import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft } from 'lucide-react-native';
import { useTaskStore } from '../store/useTaskStore';
import { Priority, Category } from '../types';
import { GradientButton } from '../components/GradientButton';
import { colors, layout } from '../theme';

export const AddTaskScreen = () => {
  const navigation = useNavigation<any>();
  const addTask = useTaskStore((state) => state.addTask);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('normal');
  const [category, setCategory] = useState<Category>('Work');

  const priorities: Priority[] = ['normal', 'urgent', 'important'];
  const categories: Category[] = ['Work', 'Personal', 'Study', 'Design', 'Health'];

  const handleSave = () => {
    if (!title.trim()) return;
    
    addTask({
      title,
      description,
      priority,
      category,
      completed: false,
      dueDate: new Date().toISOString()
    });
    
    navigation.goBack();
  };

  return (
    <LinearGradient colors={[colors.primaryLight, colors.background]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Task</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Task Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. UI UX Designer"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={colors.textLight}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Details about the task..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholderTextColor={colors.textLight}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.row}>
            {priorities.map(p => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.pill,
                  priority === p && { backgroundColor: colors.priority[p] }
                ]}
                onPress={() => setPriority(p)}
              >
                <Text style={[styles.pillText, priority === p && { color: colors.white }]}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {categories.map(c => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.pill,
                  category === c && { backgroundColor: colors.primary }
                ]}
                onPress={() => setCategory(c)}
              >
                <Text style={[styles.pillText, category === c && { color: colors.white }]}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <GradientButton title="Create Task" onPress={handleSave} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: layout.spacing.lg,
    paddingBottom: layout.spacing.md,
  },
  backBtn: {
    padding: layout.spacing.xs,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    padding: layout.spacing.lg,
    paddingBottom: 100,
  },
  inputGroup: {
    marginBottom: layout.spacing.xl,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: layout.radius.medium,
    padding: layout.spacing.md,
    fontSize: 16,
    color: colors.text,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.spacing.sm,
  },
  catScroll: {
    flexDirection: 'row',
  },
  pill: {
    backgroundColor: colors.white,
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.sm,
    borderRadius: layout.radius.full,
    marginRight: layout.spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillText: {
    color: colors.textLight,
    fontWeight: '500',
  },
  footer: {
    padding: layout.spacing.lg,
    paddingBottom: 40,
    backgroundColor: 'transparent',
  }
});
