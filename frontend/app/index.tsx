import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../src/stores/authStore';
import { colors } from '../src/utils/colors';

const { width, height } = Dimensions.get('window');

export default function Welcome() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Background decorations */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />
      <View style={styles.bgCircle3} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="school" size={48} color={colors.primary} />
        </View>
        <Text style={styles.title}>AR Academy</Text>
        <Text style={styles.subtitle}>Artırılmış Gerçeklik Eğitim Platformu</Text>
      </View>
      
      {/* Features */}
      <View style={styles.features}>
        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: colors.physics + '20' }]}>
            <Ionicons name="planet" size={24} color={colors.physics} />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Fizik</Text>
            <Text style={styles.featureDesc}>İnteraktif simülasyonlarla öğren</Text>
          </View>
        </View>
        
        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: colors.biology + '20' }]}>
            <Ionicons name="leaf" size={24} color={colors.biology} />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Biyoloji</Text>
            <Text style={styles.featureDesc}>Hücre ve organları keşfet</Text>
          </View>
        </View>
        
        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: colors.chemistry + '20' }]}>
            <Ionicons name="flask" size={24} color={colors.chemistry} />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Kimya</Text>
            <Text style={styles.featureDesc}>Atom ve molekülleri görselleştir</Text>
          </View>
        </View>
      </View>
      
      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.push('/auth/register')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryBtnText}>Başla</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.white} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => router.push('/auth/login')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryBtnText}>Zaten hesabım var</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.primary,
    opacity: 0.05,
    top: -100,
    right: -100,
  },
  bgCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.chemistry,
    opacity: 0.05,
    bottom: 100,
    left: -50,
  },
  bgCircle3: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.biology,
    opacity: 0.05,
    bottom: -50,
    right: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  features: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  actions: {
    marginTop: 'auto',
    paddingBottom: 40,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  primaryBtnText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.white,
    marginRight: 8,
  },
  secondaryBtn: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  secondaryBtnText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
});
