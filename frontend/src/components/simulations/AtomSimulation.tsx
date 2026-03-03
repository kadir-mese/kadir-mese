import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Svg, { Circle, Ellipse, Line, Text as SvgText, G, Path } from 'react-native-svg';
import { colors } from '../../utils/colors';

const { width } = Dimensions.get('window');
const SVG_WIDTH = width - 32;
const SVG_HEIGHT = 300;

interface AtomSimulationProps {
  model: string;
  element: string;
}

const ELEMENTS: Record<string, { symbol: string; name: string; protons: number; electrons: number[]; color: string }> = {
  hydrogen: { symbol: 'H', name: 'Hidrojen', protons: 1, electrons: [1], color: '#EF4444' },
  helium: { symbol: 'He', name: 'Helyum', protons: 2, electrons: [2], color: '#F59E0B' },
  carbon: { symbol: 'C', name: 'Karbon', protons: 6, electrons: [2, 4], color: '#64748B' },
  oxygen: { symbol: 'O', name: 'Oksijen', protons: 8, electrons: [2, 6], color: '#3B82F6' },
};

const MODELS: Record<string, { name: string; year: string; description: string }> = {
  dalton: { name: 'Dalton', year: '1803', description: 'Atomlar bölünemez katı kürelerdir' },
  thomson: { name: 'Thomson', year: '1897', description: 'Üzeri kuru üzümlü kek modeli - pozitif yük içinde elektronlar' },
  rutherford: { name: 'Rutherford', year: '1911', description: 'Yoğun çekirdek etrafında elektronlar döner' },
  bohr: { name: 'Bohr', year: '1913', description: 'Elektronlar belirli enerji seviyelerinde (yörüngelerde) bulunur' },
  quantum: { name: 'Kuantum', year: '1926', description: 'Elektronlar olasılık bulutları (orbitaller) içindedir' },
};

export const AtomSimulation: React.FC<AtomSimulationProps> = ({ model, element }) => {
  const elem = ELEMENTS[element];
  const modelInfo = MODELS[model];
  const centerX = SVG_WIDTH / 2;
  const centerY = SVG_HEIGHT / 2 - 20;

  const renderModel = () => {
    switch (model) {
      case 'dalton':
        return (
          <G>
            <Circle cx={centerX} cy={centerY} r={60} fill={elem.color} />
            <SvgText x={centerX} y={centerY + 8} fill={colors.white} fontSize={32} fontWeight="bold" textAnchor="middle">
              {elem.symbol}
            </SvgText>
          </G>
        );
      case 'thomson':
        return (
          <G>
            {/* Positive pudding */}
            <Circle cx={centerX} cy={centerY} r={70} fill={elem.color} opacity={0.4} />
            <Circle cx={centerX} cy={centerY} r={70} fill="none" stroke={elem.color} strokeWidth={3} />
            {/* Electrons scattered */}
            {elem.electrons.reduce((acc, count) => acc + count, 0) <= 8 && 
              [...Array(elem.electrons.reduce((acc, count) => acc + count, 0))].map((_, i) => {
                const angle = (i * 2 * Math.PI) / elem.electrons.reduce((acc, count) => acc + count, 0);
                const r = 30 + (i % 2) * 20;
                return (
                  <Circle
                    key={i}
                    cx={centerX + r * Math.cos(angle)}
                    cy={centerY + r * Math.sin(angle)}
                    r={8}
                    fill="#FBBF24"
                  />
                );
              })
            }
            <SvgText x={centerX} y={centerY + 5} fill={colors.text} fontSize={20} fontWeight="bold" textAnchor="middle">
              +
            </SvgText>
          </G>
        );
      case 'rutherford':
        return (
          <G>
            {/* Nucleus */}
            <Circle cx={centerX} cy={centerY} r={20} fill={elem.color} />
            <SvgText x={centerX} y={centerY + 5} fill={colors.white} fontSize={14} fontWeight="bold" textAnchor="middle">
              {elem.protons}+
            </SvgText>
            {/* Electron orbits (circular paths) */}
            {elem.electrons.map((count, shellIndex) => {
              const shellRadius = 40 + shellIndex * 25;
              return (
                <G key={shellIndex}>
                  <Circle cx={centerX} cy={centerY} r={shellRadius} fill="none" stroke={colors.textMuted} strokeWidth={1} strokeDasharray="4,4" />
                  {[...Array(count)].map((_, i) => {
                    const angle = (i * 2 * Math.PI) / count + shellIndex * 0.5;
                    return (
                      <Circle
                        key={i}
                        cx={centerX + shellRadius * Math.cos(angle)}
                        cy={centerY + shellRadius * Math.sin(angle)}
                        r={6}
                        fill="#FBBF24"
                      />
                    );
                  })}
                </G>
              );
            })}
          </G>
        );
      case 'bohr':
        return (
          <G>
            {/* Nucleus */}
            <Circle cx={centerX} cy={centerY} r={25} fill={elem.color} />
            {/* Protons and neutrons */}
            {[...Array(Math.min(elem.protons, 4))].map((_, i) => {
              const angle = (i * 2 * Math.PI) / Math.min(elem.protons, 4);
              return (
                <Circle key={`p${i}`} cx={centerX + 8 * Math.cos(angle)} cy={centerY + 8 * Math.sin(angle)} r={5} fill="#EF4444" />
              );
            })}
            <SvgText x={centerX} y={centerY + 5} fill={colors.white} fontSize={12} fontWeight="bold" textAnchor="middle">
              {elem.symbol}
            </SvgText>
            {/* Energy levels with electrons */}
            {elem.electrons.map((count, shellIndex) => {
              const shellRadius = 45 + shellIndex * 30;
              return (
                <G key={shellIndex}>
                  <Circle cx={centerX} cy={centerY} r={shellRadius} fill="none" stroke={colors.primary} strokeWidth={2} />
                  <SvgText x={centerX + shellRadius + 12} y={centerY + 5} fill={colors.textSecondary} fontSize={10}>
                    n={shellIndex + 1}
                  </SvgText>
                  {[...Array(count)].map((_, i) => {
                    const angle = (i * 2 * Math.PI) / count - Math.PI / 2;
                    return (
                      <Circle
                        key={i}
                        cx={centerX + shellRadius * Math.cos(angle)}
                        cy={centerY + shellRadius * Math.sin(angle)}
                        r={7}
                        fill="#FBBF24"
                        stroke="#F59E0B"
                        strokeWidth={1}
                      />
                    );
                  })}
                </G>
              );
            })}
          </G>
        );
      case 'quantum':
        return (
          <G>
            {/* Nucleus */}
            <Circle cx={centerX} cy={centerY} r={15} fill={elem.color} />
            <SvgText x={centerX} y={centerY + 4} fill={colors.white} fontSize={10} fontWeight="bold" textAnchor="middle">
              {elem.symbol}
            </SvgText>
            {/* Electron probability clouds */}
            {elem.electrons.map((count, shellIndex) => {
              const baseRadius = 35 + shellIndex * 35;
              return (
                <G key={shellIndex}>
                  {/* s orbital (spherical) */}
                  <Circle cx={centerX} cy={centerY} r={baseRadius} fill="#FBBF24" opacity={0.15} />
                  <Circle cx={centerX} cy={centerY} r={baseRadius} fill="none" stroke="#FBBF24" strokeWidth={1} opacity={0.4} />
                  {/* p orbitals (dumbbell) for shell > 1 */}
                  {shellIndex > 0 && count > 2 && (
                    <G>
                      <Ellipse cx={centerX} cy={centerY} rx={baseRadius * 1.2} ry={baseRadius * 0.4} fill="#60A5FA" opacity={0.1} />
                      <Ellipse cx={centerX} cy={centerY} rx={baseRadius * 0.4} ry={baseRadius * 1.2} fill="#34D399" opacity={0.1} />
                    </G>
                  )}
                  {/* Probability dots */}
                  {[...Array(count * 3)].map((_, i) => {
                    const angle = Math.random() * 2 * Math.PI;
                    const r = baseRadius * (0.5 + Math.random() * 0.5);
                    return (
                      <Circle
                        key={i}
                        cx={centerX + r * Math.cos(angle)}
                        cy={centerY + r * Math.sin(angle)}
                        r={2}
                        fill="#FBBF24"
                        opacity={0.6}
                      />
                    );
                  })}
                </G>
              );
            })}
          </G>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        {renderModel()}
        
        {/* Model info */}
        <G>
          <SvgText x={20} y={25} fill={colors.text} fontSize={16} fontWeight="bold">
            {modelInfo.name} Modeli ({modelInfo.year})
          </SvgText>
        </G>
        
        {/* Element info */}
        <G>
          <SvgText x={SVG_WIDTH - 20} y={25} fill={elem.color} fontSize={14} fontWeight="bold" textAnchor="end">
            {elem.name} ({elem.symbol})
          </SvgText>
          <SvgText x={SVG_WIDTH - 20} y={42} fill={colors.textSecondary} fontSize={11} textAnchor="end">
            Proton: {elem.protons} | Elektron: {elem.electrons.reduce((a, b) => a + b, 0)}
          </SvgText>
        </G>
      </Svg>
      
      {/* Description */}
      <View style={styles.descPanel}>
        <Text style={styles.descText}>{modelInfo.description}</Text>
      </View>
      
      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: elem.color }]} />
          <Text style={styles.legendText}>Çekirdek (+)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FBBF24' }]} />
          <Text style={styles.legendText}>Elektron (-)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 8,
    alignItems: 'center',
  },
  descPanel: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 8,
    padding: 12,
    width: '100%',
    marginBottom: 8,
  },
  descText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
