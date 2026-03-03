import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../src/stores/authStore';
import { subjectsAPI, simulationsAPI, progressAPI } from '../../src/services/api';
import { SimulationCard } from '../../src/components/SimulationCard';
import { colors } from '../../src/utils/colors';

export default function Home() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [recentSimulations, setRecentSimulations] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const simsRes = await simulationsAPI.getAll();
      setRecentSimulations(simsRes.data.slice(0, 4));
      
      if (user) {
        const statsRes = await progressAPI.getUserStats(user.id);
        setStats(statsRes.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Merhaba{user ? `, ${user.name}` : ''} 👋</Text>
            <Text style={styles.subtitle}>Bugün ne öğrenmek istersin?</Text>
          </View>
          <Pressable style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </Pressable>
        </View>

        {/* Stats Card */}
        {stats && (
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Text style={styles.statsTitle}>İlerlemen</Text>
              <Text style={styles.statsPercent}>{stats.completion_percentage}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${stats.completion_percentage}%` }]} />
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                <Text style={styles.statValue}>{stats.completed}</Text>
                <Text style={styles.statLabel}>Tamamlanan</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="time" size={20} color={colors.warning} />
                <Text style={styles.statValue}>{stats.total_time_minutes}</Text>
                <Text style={styles.statLabel}>Dakika</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="star" size={20} color={colors.primary} />
                <Text style={styles.statValue}>{stats.total_score}</Text>
                <Text style={styles.statLabel}>Puan</Text>
              </View>
            </View>
          </View>
        )}

        {/* Quick Access */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
          <View style={styles.quickAccess}>
            <Pressable
              style={[styles.quickItem, { backgroundColor: colors.physics + '20' }]}
              onPress={() => router.push('/(tabs)/subjects')}
            >
              <Ionicons name="planet-outline" size={28} color={colors.physics} />
              <Text style={[styles.quickLabel, { color: colors.physics }]}>Fizik</Text>
            </Pressable>
            <Pressable
              style={[styles.quickItem, { backgroundColor: colors.biology + '20' }]}
              onPress={() => router.push('/(tabs)/subjects')}
            >
              <Ionicons name="leaf-outline" size={28} color={colors.biology} />
              <Text style={[styles.quickLabel, { color: colors.biology }]}>Biyoloji</Text>
            </Pressable>
            <Pressable
              style={[styles.quickItem, { backgroundColor: colors.chemistry + '20' }]}
              onPress={() => router.push('/(tabs)/subjects')}
            >
              <Ionicons name="flask-outline" size={28} color={colors.chemistry} />
              <Text style={[styles.quickLabel, { color: colors.chemistry }]}>Kimya</Text>
            </Pressable>
            <Pressable
              style={[styles.quickItem, { backgroundColor: colors.primary + '20' }]}
              onPress={() => router.push('/(tabs)/chat')}
            >
              <Ionicons name="chatbubbles-outline" size={28} color={colors.primary} />
              <Text style={[styles.quickLabel, { color: colors.primary }]}>AI</Text>
            </Pressable>
          </View>
        </View>

        {/* Recent Simulations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Önerilen Simülasyonlar</Text>
            <Pressable onPress={() => router.push('/(tabs)/subjects')}>
              <Text style={styles.seeAll}>Tümünü Gör</Text>
            </Pressable>
          </View>
          {recentSimulations.map((sim) => (
            <SimulationCard
              key={sim.id}
              simulation={sim}
              completed={user?.progress?.[sim.id]?.completed}
              onPress={() => router.push(`/simulation/${sim.id}`)}
            />
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  statsPercent: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.surfaceLight,
    borderRadius: 4,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  quickAccess: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickItem: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
});
