import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
    name_tr: string;
    icon: string;
    color: string;
    units: any[];
  };
  progress?: number;
  onPress: () => void;
}

const getIconName = (icon: string): keyof typeof Ionicons.glyphMap => {
  switch (icon) {
    case 'atom': return 'planet-outline';
    case 'leaf': return 'leaf-outline';
    case 'flask': return 'flask-outline';
    default: return 'book-outline';
  }
};

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, progress = 0, onPress }) => {
  return (
    <Pressable
      style={[styles.card, { borderLeftColor: subject.color }]}
      onPress={onPress}
      
    >
      <View style={[styles.iconContainer, { backgroundColor: subject.color + '20' }]}>
        <Ionicons name={getIconName(subject.icon)} size={32} color={subject.color} />
      </View>
      <Text style={styles.title}>{subject.name_tr}</Text>
      <Text style={styles.subtitle}>{subject.units.length} ünite</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: subject.color }]} />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.surfaceLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: 8,
    width: 35,
  },
});
