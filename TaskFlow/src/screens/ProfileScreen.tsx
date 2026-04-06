import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LogOut, ChevronRight, Star } from 'lucide-react-native';
import { colors, layout } from '../theme';
import { useTaskStore } from '../store/useTaskStore';

export const ProfileScreen = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <LinearGradient colors={[colors.primaryLight, colors.background]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Header */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
            style={styles.avatar} 
          />
          <Text style={styles.name}>Sarah Jenkins</Text>
          <Text style={styles.email}>sarah.j@example.com</Text>
        </View>

        {/* Upgrade Card */}
        <TouchableOpacity activeOpacity={0.9} style={styles.upgradeCard}>
          <LinearGradient
            colors={[colors.priority.important, '#B39DDB']}
            style={styles.upgradeGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View>
              <Text style={styles.upgradeTitle}>Upgrade to PRO</Text>
              <Text style={styles.upgradeSub}>Get premium features & analytics</Text>
            </View>
            <Star size={32} color={colors.white} fill={colors.white} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.white }]}>
            <Text style={styles.statNumber}>{completedTasks}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.white }]}>
            <Text style={[styles.statNumber, { color: colors.priority.urgent }]}>{pendingTasks}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.menuContainer}>
          {['Edit Profile', 'Notifications', 'Security', 'Theme', 'Help & Support'].map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.menuItem}>
              <Text style={styles.menuText}>{item}</Text>
              <ChevronRight size={20} color={colors.textLight} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0, marginTop: layout.spacing.md }]}>
            <Text style={[styles.menuText, { color: colors.error }]}>Log Out</Text>
            <LogOut size={20} color={colors.error} />
          </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    marginBottom: layout.spacing.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: colors.white,
    marginBottom: layout.spacing.md,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.textLight,
  },
  upgradeCard: {
    borderRadius: layout.radius.medium,
    marginBottom: layout.spacing.xl,
    shadowColor: colors.priority.important,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  upgradeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: layout.spacing.lg,
  },
  upgradeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  upgradeSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: layout.spacing.xl,
  },
  statCard: {
    flex: 1,
    padding: layout.spacing.lg,
    borderRadius: layout.radius.medium,
    alignItems: 'center',
    marginHorizontal: layout.spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textLight,
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: layout.radius.medium,
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  }
});
