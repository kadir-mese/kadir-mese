import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

interface SimulationCardProps {
  simulation: {
    id: string;
    name: string;
    name_tr: string;
    description_tr: string;
    type: string;
    difficulty: string;
  };
  completed?: boolean;
  onPress: () => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return colors.success;
    case 'medium': return colors.warning;
    case 'hard': return colors.error;
    default: return colors.textMuted;
  }
};

const getDifficultyLabel = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'Kolay';
    case 'medium': return 'Orta';
    case 'hard': return 'Zor';
    default: return difficulty;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'physics': return colors.physics;
    case 'biology': return colors.biology;
    case 'chemistry': return colors.chemistry;
    default: return colors.primary;
  }
};

export const SimulationCard: React.FC<SimulationCardProps> = ({ simulation, completed, onPress }) => {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      
    >
      <View style={styles.header}>
        <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(simulation.type) }]} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{simulation.name_tr}</Text>
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: getDifficultyColor(simulation.difficulty) + '20' }]}>
              <Text style={[styles.badgeText, { color: getDifficultyColor(simulation.difficulty) }]}>
                {getDifficultyLabel(simulation.difficulty)}
              </Text>
            </View>
          </View>
        </View>
        {completed && (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={24} color={colors.success} />
          </View>
        )}
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {simulation.description_tr}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.startText}>Simülasyonu Başlat</Text>
        <Ionicons name="arrow-forward" size={18} color={colors.primary} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  typeIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  badges: {
    flexDirection: 'row',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  completedBadge: {
    marginLeft: 8,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
    marginLeft: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  startText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
});
