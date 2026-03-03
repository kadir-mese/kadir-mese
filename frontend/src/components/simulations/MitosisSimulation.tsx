import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Circle, Ellipse, Line, Text as SvgText, G, Rect } from 'react-native-svg';
import { colors } from '../utils/colors';

const { width } = Dimensions.get('window');
const SVG_WIDTH = width - 32;
const SVG_HEIGHT = 300;

interface MitosisSimulationProps {
  speed: number;
  phase: string;
}

const PHASES = [
  { id: 'interphase', name: 'İnterfaz', description: 'Hücre büyür, DNA replike olur' },
  { id: 'prophase', name: 'Profaz', description: 'Kromozomlar yoğunlaşır, çekirdek zarı çözülür' },
  { id: 'metaphase', name: 'Metafaz', description: 'Kromozomlar ekvatorda dizilir' },
  { id: 'anaphase', name: 'Anafaz', description: 'Kardes kromatitler kutuplara çekilir' },
  { id: 'telophase', name: 'Telofaz', description: 'Çekirdek zarları oluşur, sitokinez başlar' },
];

export const MitosisSimulation: React.FC<MitosisSimulationProps> = ({ speed, phase }) => {
  const [currentPhase, setCurrentPhase] = useState(phase);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    setCurrentPhase(phase);
  }, [phase]);

  useEffect(() => {
    if (isPlaying) {
      const phaseIndex = PHASES.findIndex(p => p.id === currentPhase);
      const nextIndex = (phaseIndex + 1) % PHASES.length;
      const timeout = setTimeout(() => {
        setCurrentPhase(PHASES[nextIndex].id);
      }, 2000 / speed);
      return () => clearTimeout(timeout);
    }
  }, [isPlaying, currentPhase, speed]);

  const currentPhaseInfo = PHASES.find(p => p.id === currentPhase);
  const centerX = SVG_WIDTH / 2;
  const centerY = SVG_HEIGHT / 2;

  const renderPhase = () => {
    switch (currentPhase) {
      case 'interphase':
        return (
          <G>
            {/* Cell membrane */}
            <Circle cx={centerX} cy={centerY} r={100} fill="#FEF3C7" stroke="#F59E0B" strokeWidth={3} />
            {/* Nucleus */}
            <Circle cx={centerX} cy={centerY} r={40} fill="#8B5CF6" opacity={0.8} />
            {/* Nucleolus */}
            <Circle cx={centerX} cy={centerY} r={15} fill="#6D28D9" />
            {/* Chromatin (loose DNA) */}
            {[...Array(8)].map((_, i) => (
              <Line
                key={i}
                x1={centerX - 25 + Math.random() * 50}
                y1={centerY - 25 + Math.random() * 50}
                x2={centerX - 25 + Math.random() * 50}
                y2={centerY - 25 + Math.random() * 50}
                stroke="#C4B5FD"
                strokeWidth={2}
              />
            ))}
            {/* Centrioles */}
            <Rect x={centerX + 60} y={centerY - 5} width={15} height={10} fill="#3B82F6" rx={2} />
            <Rect x={centerX + 60} y={centerY + 8} width={15} height={10} fill="#3B82F6" rx={2} />
          </G>
        );
      case 'prophase':
        return (
          <G>
            <Circle cx={centerX} cy={centerY} r={100} fill="#FEF3C7" stroke="#F59E0B" strokeWidth={3} />
            {/* Condensing chromosomes */}
            {[[-20, -15], [20, -15], [-20, 15], [20, 15]].map(([dx, dy], i) => (
              <G key={i}>
                <Rect x={centerX + dx - 5} y={centerY + dy - 20} width={10} height={40} fill="#8B5CF6" rx={4} />
              </G>
            ))}
            {/* Breaking down nuclear envelope (dashed) */}
            <Circle cx={centerX} cy={centerY} r={45} fill="none" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5,5" opacity={0.5} />
            {/* Centrioles moving apart */}
            <Rect x={centerX - 80} y={centerY - 5} width={12} height={10} fill="#3B82F6" rx={2} />
            <Rect x={centerX + 68} y={centerY - 5} width={12} height={10} fill="#3B82F6" rx={2} />
            {/* Spindle fibers forming */}
            {[-30, -10, 10, 30].map((offset, i) => (
              <Line key={i} x1={centerX - 70} y1={centerY} x2={centerX + offset} y2={centerY + offset * 0.5} stroke="#60A5FA" strokeWidth={1} opacity={0.5} />
            ))}
          </G>
        );
      case 'metaphase':
        return (
          <G>
            <Circle cx={centerX} cy={centerY} r={100} fill="#FEF3C7" stroke="#F59E0B" strokeWidth={3} />
            {/* Chromosomes aligned at metaphase plate */}
            {[-30, -10, 10, 30].map((dy, i) => (
              <G key={i}>
                <Rect x={centerX - 6} y={centerY + dy - 12} width={12} height={24} fill="#8B5CF6" rx={4} />
                <Line x1={centerX} y1={centerY + dy - 12} x2={centerX} y2={centerY + dy + 12} stroke="#6D28D9" strokeWidth={2} />
              </G>
            ))}
            {/* Centrioles at poles */}
            <Rect x={centerX - 85} y={centerY - 5} width={12} height={10} fill="#3B82F6" rx={2} />
            <Rect x={centerX + 73} y={centerY - 5} width={12} height={10} fill="#3B82F6" rx={2} />
            {/* Spindle fibers */}
            {[-30, -10, 10, 30].map((dy, i) => (
              <G key={i}>
                <Line x1={centerX - 75} y1={centerY} x2={centerX - 6} y2={centerY + dy} stroke="#60A5FA" strokeWidth={1.5} />
                <Line x1={centerX + 75} y1={centerY} x2={centerX + 6} y2={centerY + dy} stroke="#60A5FA" strokeWidth={1.5} />
              </G>
            ))}
            {/* Metaphase plate line */}
            <Line x1={centerX} y1={centerY - 60} x2={centerX} y2={centerY + 60} stroke="#EF4444" strokeWidth={1} strokeDasharray="4,4" />
          </G>
        );
      case 'anaphase':
        return (
          <G>
            <Circle cx={centerX} cy={centerY} r={100} fill="#FEF3C7" stroke="#F59E0B" strokeWidth={3} />
            {/* Separated chromatids moving to poles */}
            {[-30, -10, 10, 30].map((dy, i) => (
              <G key={i}>
                {/* Left chromatid */}
                <Rect x={centerX - 50} y={centerY + dy * 0.7 - 8} width={8} height={16} fill="#8B5CF6" rx={3} />
                {/* Right chromatid */}
                <Rect x={centerX + 42} y={centerY + dy * 0.7 - 8} width={8} height={16} fill="#8B5CF6" rx={3} />
              </G>
            ))}
            {/* Centrioles */}
            <Rect x={centerX - 85} y={centerY - 5} width={12} height={10} fill="#3B82F6" rx={2} />
            <Rect x={centerX + 73} y={centerY - 5} width={12} height={10} fill="#3B82F6" rx={2} />
            {/* Spindle fibers (shortened) */}
            {[-30, -10, 10, 30].map((dy, i) => (
              <G key={i}>
                <Line x1={centerX - 75} y1={centerY} x2={centerX - 42} y2={centerY + dy * 0.7} stroke="#60A5FA" strokeWidth={1.5} />
                <Line x1={centerX + 75} y1={centerY} x2={centerX + 50} y2={centerY + dy * 0.7} stroke="#60A5FA" strokeWidth={1.5} />
              </G>
            ))}
            {/* Cell elongating */}
            <Ellipse cx={centerX} cy={centerY} rx={105} ry={90} fill="none" stroke="#F59E0B" strokeWidth={1} strokeDasharray="4,4" />
          </G>
        );
      case 'telophase':
        return (
          <G>
            {/* Two forming cells */}
            <Ellipse cx={centerX - 45} cy={centerY} rx={55} ry={80} fill="#FEF3C7" stroke="#F59E0B" strokeWidth={3} />
            <Ellipse cx={centerX + 45} cy={centerY} rx={55} ry={80} fill="#FEF3C7" stroke="#F59E0B" strokeWidth={3} />
            {/* Cleavage furrow */}
            <Line x1={centerX} y1={centerY - 80} x2={centerX} y2={centerY + 80} stroke="#EF4444" strokeWidth={3} />
            {/* Reforming nuclei */}
            <Circle cx={centerX - 45} cy={centerY} r={25} fill="#8B5CF6" opacity={0.6} />
            <Circle cx={centerX + 45} cy={centerY} r={25} fill="#8B5CF6" opacity={0.6} />
            {/* Decondensing chromosomes */}
            {[-10, 10].map((dy, i) => (
              <G key={i}>
                <Rect x={centerX - 50} y={centerY + dy - 6} width={10} height={12} fill="#C4B5FD" rx={2} />
                <Rect x={centerX + 40} y={centerY + dy - 6} width={10} height={12} fill="#C4B5FD" rx={2} />
              </G>
            ))}
          </G>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        {renderPhase()}
        
        {/* Phase label */}
        <Rect x={SVG_WIDTH/2 - 60} y={15} width={120} height={30} fill={colors.primary} rx={8} />
        <SvgText x={SVG_WIDTH/2} y={35} fill={colors.white} fontSize={14} fontWeight="bold" textAnchor="middle">
          {currentPhaseInfo?.name}
        </SvgText>
      </Svg>
      
      {/* Phase description */}
      <View style={styles.descPanel}>
        <Text style={styles.descText}>{currentPhaseInfo?.description}</Text>
      </View>
      
      {/* Phase selector */}
      <View style={styles.phaseSelector}>
        {PHASES.map((p, index) => (
          <TouchableOpacity
            key={p.id}
            style={[
              styles.phaseBtn,
              currentPhase === p.id && styles.phaseBtnActive
            ]}
            onPress={() => setCurrentPhase(p.id)}
          >
            <Text style={[
              styles.phaseBtnText,
              currentPhase === p.id && styles.phaseBtnTextActive
            ]}>
              {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Play button */}
      <TouchableOpacity
        style={[styles.playBtn, isPlaying && styles.playBtnActive]}
        onPress={() => setIsPlaying(!isPlaying)}
      >
        <Text style={styles.playBtnText}>
          {isPlaying ? '⏸ Durdur' : '▶ Otomatik Oynat'}
        </Text>
      </TouchableOpacity>
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
    marginVertical: 8,
    width: '100%',
  },
  descText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  phaseSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  phaseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  phaseBtnActive: {
    backgroundColor: colors.primary,
  },
  phaseBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  phaseBtnTextActive: {
    color: colors.white,
  },
  playBtn: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  playBtnActive: {
    backgroundColor: colors.primary,
  },
  playBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});
