import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { subjectsAPI, simulationsAPI } from '../../src/services/api';
import { useAuthStore } from '../../src/stores/authStore';
import { SubjectCard } from '../../src/components/SubjectCard';
import { SimulationCard } from '../../src/components/SimulationCard';
import { colors } from '../../src/utils/colors';

const { width } = Dimensions.get('window');

export default function Subjects() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [simulations, setSimulations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      fetchSimulations(selectedSubject);
    } else {
      fetchSimulations();
    }
  }, [selectedSubject]);

  const fetchSubjects = async () => {
    try {
      const res = await subjectsAPI.getAll();
      setSubjects(res.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchSimulations = async (subjectId?: string) => {
    try {
      setLoading(true);
      const res = await simulationsAPI.getAll(subjectId);
      setSimulations(res.data);
    } catch (error) {
      console.error('Error fetching simulations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSubjectProgress = (subjectId: string) => {
    if (!user?.progress) return 0;
    const subjectSims = simulations.filter(s => s.subject_id === subjectId);
    const completed = subjectSims.filter(s => user.progress[s.id]?.completed).length;
    return subjectSims.length > 0 ? Math.round((completed / subjectSims.length) * 100) : 0;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Dersler</Text>
          <Text style={styles.subtitle}>Bir ders seçerek simülasyonlara eriş</Text>
        </View>

        {/* Subject Cards */}
        <View style={styles.subjectsGrid}>
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              progress={getSubjectProgress(subject.id)}
              onPress={() => setSelectedSubject(
                selectedSubject === subject.id ? null : subject.id
              )}
            />
          ))}
        </View>

        {/* Filter tabs */}
        <View style={styles.filterContainer}>
          <Pressable
            style={[styles.filterBtn, !selectedSubject && styles.filterBtnActive]}
            onPress={() => setSelectedSubject(null)}
          >
            <Text style={[styles.filterText, !selectedSubject && styles.filterTextActive]}>
              Tümü
            </Text>
          </Pressable>
          {subjects.map((subject) => (
            <Pressable
              key={subject.id}
              style={[
                styles.filterBtn,
                selectedSubject === subject.id && styles.filterBtnActive,
                selectedSubject === subject.id && { backgroundColor: subject.color }
              ]}
              onPress={() => setSelectedSubject(
                selectedSubject === subject.id ? null : subject.id
              )}
            >
              <Text style={[
                styles.filterText,
                selectedSubject === subject.id && styles.filterTextActive
              ]}>
                {subject.name_tr}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Simulations List */}
        <View style={styles.simulationsList}>
          <Text style={styles.sectionTitle}>
            Simülasyonlar ({simulations.length})
          </Text>
          {simulations.map((sim) => (
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
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 8,
  },
  filterBtnActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.white,
  },
  simulationsList: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
});
