import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { simulationsAPI, progressAPI } from '../../src/services/api';
import { useAuthStore } from '../../src/stores/authStore';
import { colors } from '../../src/utils/colors';
import { ParameterSlider, ParameterSelect } from '../../src/components/ParameterControls';
import { ProjectileSimulation } from '../../src/components/simulations/ProjectileSimulation';
import { NewtonSimulation } from '../../src/components/simulations/NewtonSimulation';
import { CellSimulation } from '../../src/components/simulations/CellSimulation';
import { MitosisSimulation } from '../../src/components/simulations/MitosisSimulation';
import { AtomSimulation } from '../../src/components/simulations/AtomSimulation';
import { PeriodicTableSimulation } from '../../src/components/simulations/PeriodicTableSimulation';

export default function SimulationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [simulation, setSimulation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState<Record<string, any>>({});
  const [startTime] = useState(Date.now());
  const [isPlaying, setIsPlaying] = useState(false);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    fetchSimulation();
  }, [id]);

  const fetchSimulation = async () => {
    try {
      const res = await simulationsAPI.getOne(id as string);
      setSimulation(res.data);
      
      // Initialize params with defaults
      const initialParams: Record<string, any> = {};
      res.data.parameters.forEach((p: any) => {
        if (p.options) {
          initialParams[p.name] = p.default;
        } else {
          initialParams[p.name] = p.default;
        }
      });
      setParams(initialParams);
    } catch (error) {
      console.error('Error fetching simulation:', error);
      Alert.alert('Hata', 'Simülasyon yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleComplete = async () => {
    if (!user) {
      Alert.alert('Uyarı', 'İlerlemeyi kaydetmek için giriş yapmalısınız');
      return;
    }

    setCompleting(true);
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const score = Math.min(100, Math.round(timeSpent / 10) + 50);

    try {
      await progressAPI.update(user.id, {
        simulation_id: id as string,
        completed: true,
        score,
        time_spent: timeSpent,
      });

      // Update local user progress
      setUser({
        ...user,
        progress: {
          ...user.progress,
          [id as string]: { completed: true, score, time_spent: timeSpent },
        },
      });

      Alert.alert(
        'Tebrikler! 🎉',
        `Simülasyonu tamamladınız!\nPuan: ${score}\nSüre: ${Math.round(timeSpent / 60)} dakika`,
        [{ text: 'Tamam', onPress: () => router.back() }]
      );
    } catch (error) {
      console.error('Error saving progress:', error);
      Alert.alert('Hata', 'İlerleme kaydedilemedi');
    } finally {
      setCompleting(false);
    }
  };

  const handleAIHelp = () => {
    router.push('/(tabs)/chat');
  };

  const renderSimulation = () => {
    if (!simulation) return null;

    switch (simulation.id) {
      case 'projectile_motion':
        return (
          <ProjectileSimulation
            angle={params.angle || 45}
            velocity={params.velocity || 50}
            gravity={params.gravity || 9.8}
            isPlaying={isPlaying}
          />
        );
      case 'newton_laws':
        return (
          <NewtonSimulation
            mass={params.mass || 10}
            angle={params.angle || 30}
            friction={params.friction || 0.3}
          />
        );
      case 'cell_structure':
        return (
          <CellSimulation
            cellType={params.cell_type || 'animal'}
            zoom={params.zoom || 1}
          />
        );
      case 'mitosis':
        return (
          <MitosisSimulation
            speed={params.speed || 1}
            phase={params.phase || 'interphase'}
          />
        );
      case 'atom_models':
        return (
          <AtomSimulation
            model={params.model || 'bohr'}
            element={params.element || 'hydrogen'}
          />
        );
      case 'periodic_table':
        return (
          <PeriodicTableSimulation
            view={params.view || 'standard'}
            highlight={params.highlight || 'none'}
          />
        );
      default:
        return (
          <View style={styles.placeholderSim}>
            <Ionicons name="construct-outline" size={48} color={colors.textMuted} />
            <Text style={styles.placeholderText}>Simülasyon yakında eklenecek</Text>
          </View>
        );
    }
  };

  const renderControls = () => {
    if (!simulation?.parameters) return null;

    return simulation.parameters.map((param: any) => {
      if (param.options) {
        return (
          <ParameterSelect
            key={param.name}
            label={param.name_tr}
            value={params[param.name]}
            options={param.options.map((opt: string) => ({
              value: opt,
              label: opt.charAt(0).toUpperCase() + opt.slice(1).replace('_', ' '),
            }))}
            onChange={(value) => setParams({ ...params, [param.name]: value })}
          />
        );
      }
      return (
        <ParameterSlider
          key={param.name}
          label={param.name_tr}
          value={params[param.name]}
          min={param.min}
          max={param.max}
          step={param.min < 1 ? 0.1 : 1}
          unit={param.unit}
          onChange={(value) => setParams({ ...params, [param.name]: value })}
        />
      );
    });
  };

  const getSubjectColor = () => {
    switch (simulation?.type) {
      case 'physics': return colors.physics;
      case 'biology': return colors.biology;
      case 'chemistry': return colors.chemistry;
      default: return colors.primary;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!simulation) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
          <Text style={styles.errorText}>Simülasyon bulunamadı</Text>
          <Pressable 
            style={({ pressed }) => [styles.backButton, pressed && styles.btnPressed]}
            onPress={handleGoBack}
          >
            <Text style={styles.backButtonText}>Geri Dön</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const isCompleted = user?.progress?.[id as string]?.completed;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={({ pressed }) => [styles.backBtn, pressed && styles.btnPressed]}
          onPress={handleGoBack}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>{simulation.name_tr}</Text>
          <View style={[styles.subjectBadge, { backgroundColor: getSubjectColor() + '20' }]}>
            <Text style={[styles.subjectBadgeText, { color: getSubjectColor() }]}>
              {simulation.type === 'physics' ? 'Fizik' : 
               simulation.type === 'biology' ? 'Biyoloji' : 'Kimya'}
            </Text>
          </View>
        </View>
        {isCompleted && (
          <View style={styles.completedIcon}>
            <Ionicons name="checkmark-circle" size={28} color={colors.success} />
          </View>
        )}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Description */}
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionText}>{simulation.description_tr}</Text>
        </View>

        {/* Simulation View */}
        <View style={styles.simulationContainer}>
          {renderSimulation()}
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          <Text style={styles.controlsTitle}>Parametreler</Text>
          {renderControls()}
        </View>

        {/* Complete Button */}
        <Pressable
          style={({ pressed }) => [
            styles.completeBtn, 
            isCompleted && styles.completedBtn,
            pressed && styles.btnPressed
          ]}
          onPress={handleComplete}
          disabled={completing}
        >
          {completing ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <>
              <Ionicons
                name={isCompleted ? 'checkmark-circle' : 'flag'}
                size={20}
                color={colors.white}
              />
              <Text style={styles.completeBtnText}>
                {isCompleted ? 'Tekrar Tamamla' : 'Tamamlandı Olarak İşaretle'}
              </Text>
            </>
          )}
        </Pressable>

        {/* AI Help */}
        <Pressable
          style={({ pressed }) => [styles.helpBtn, pressed && styles.helpBtnPressed]}
          onPress={handleAIHelp}
        >
          <Ionicons name="sparkles" size={20} color={colors.primary} />
          <Text style={styles.helpBtnText}>AI Asistandan Yardım Al</Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    cursor: 'pointer' as any,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer' as any,
  },
  btnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
  headerCenter: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  subjectBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  subjectBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  completedIcon: {
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  descriptionCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  simulationContainer: {
    marginTop: 16,
  },
  controlsContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  controlsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  completeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 20,
    cursor: 'pointer' as any,
  },
  completedBtn: {
    backgroundColor: colors.primary,
  },
  completeBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 8,
  },
  helpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary + '15',
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 12,
    cursor: 'pointer' as any,
  },
  helpBtnPressed: {
    opacity: 0.7,
  },
  helpBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
    marginLeft: 8,
  },
  placeholderSim: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 12,
  },
});
