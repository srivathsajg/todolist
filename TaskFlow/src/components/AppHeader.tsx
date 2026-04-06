import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Bell, MoreVertical } from 'lucide-react-native';
import { colors, layout } from '../theme';

interface AppHeaderProps {
  title: string;
  avatarUrl?: string;
}

export const AppHeader = ({ title, avatarUrl }: AppHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image 
          source={{ uri: avatarUrl || 'https://i.pravatar.cc/150?img=11' }} 
          style={styles.avatar} 
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.iconBtn}>
          <Bell size={24} color={colors.text} />
          <View style={styles.badge} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <MoreVertical size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.lg,
    paddingTop: 60,
    paddingBottom: layout.spacing.md,
    backgroundColor: 'transparent',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: layout.spacing.sm,
    borderWidth: 2,
    borderColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: layout.spacing.md,
    padding: layout.spacing.xs,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.priority.urgent,
    borderWidth: 1,
    borderColor: colors.white,
  }
});
