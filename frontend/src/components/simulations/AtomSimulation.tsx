import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Svg, { Circle, Ellipse, Line, Text as SvgText, G, Path, Defs, RadialGradient, Stop } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
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
  
  const [electronAngles, setElectronAngles] = useState<number[][]>([]);
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(performance.now());

  // Initialize electron angles
  useEffect(() => {
    const angles: number[][] = [];
    elem.electrons.forEach((count, shellIndex) => {
      const shellAngles: number[] = [];
      for (let i = 0; i < count; i++) {
        shellAngles.push((i * 2 * Math.PI) / count + shellIndex * 0.5);
      }
      angles.push(shellAngles);
    });
    setElectronAngles(angles);
  }, [element]);

  // Animation loop
  useEffect(() => {
    if (!isAnimating || model === 'dalton' || model === 'quantum') {
      return;
    }

    const animate = (timestamp: number) => {
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      
      setElectronAngles(prev => {
        return prev.map((shellAngles, shellIndex) => {
          const speed = 1 + (shellIndex * 0.3); // Inner electrons faster
          return shellAngles.map(angle => angle + 0.02 * speed);
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, model]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const renderModel = () => {
    switch (model) {
      case 'dalton':
        return (
          <G>
            <Circle cx={centerX} cy={centerY} r={60} fill={elem.color} />
            <Circle cx={centerX - 15} cy={centerY - 15} r={15} fill="rgba(255,255,255,0.2)" />
            <SvgText x={centerX} y={centerY + 8} fill={colors.white} fontSize={32} fontWeight="bold" textAnchor="middle">
              {elem.symbol}
            </SvgText>
          </G>
        );
        
      case 'thomson':
        return (
          <G>
            {/* Positive pudding */}
            <Circle cx={centerX} cy={centerY} r={70} fill={elem.color} opacity={0.3} />
            <Circle cx={centerX} cy={centerY} r={70} fill="none" stroke={elem.color} strokeWidth={3} />
            {/* Plus signs for positive charge */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <SvgText
                key={`plus${i}`}
                x={centerX + 45 * Math.cos(angle * Math.PI / 180)}
                y={centerY + 45 * Math.sin(angle * Math.PI / 180) + 5}
                fill={elem.color}
                fontSize={14}
                fontWeight="bold"
                textAnchor="middle"
              >
                +
              </SvgText>
            ))}
            {/* Electrons scattered with animation */}
            {electronAngles[0]?.map((angle, i) => {
              const r = 25 + (i % 2) * 25;
              return (
                <G key={`e${i}`}>
                  <Circle
                    cx={centerX + r * Math.cos(angle)}
                    cy={centerY + r * Math.sin(angle)}
                    r={10}
                    fill="#FBBF24"
                  />
                  <SvgText
                    x={centerX + r * Math.cos(angle)}
                    y={centerY + r * Math.sin(angle) + 4}
                    fill="#92400E"
                    fontSize={10}
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    -
                  </SvgText>
                </G>
              );
            })}
          </G>
        );
        
      case 'rutherford':
      case 'bohr':
        return (
          <G>
            {/* Nucleus with glow */}
            <Circle cx={centerX} cy={centerY} r={30} fill={elem.color} opacity={0.3} />
            <Circle cx={centerX} cy={centerY} r={22} fill={elem.color} />
            <Circle cx={centerX - 5} cy={centerY - 5} r={5} fill="rgba(255,255,255,0.3)" />
            {/* Protons visualization */}
            {elem.protons <= 4 && [...Array(elem.protons)].map((_, i) => {
              const angle = (i * 2 * Math.PI) / elem.protons;
              return (
                <Circle
                  key={`p${i}`}
                  cx={centerX + 8 * Math.cos(angle)}
                  cy={centerY + 8 * Math.sin(angle)}
                  r={5}
                  fill="#EF4444"
                />
              );
            })}
            <SvgText x={centerX} y={centerY + 5} fill={colors.white} fontSize={14} fontWeight="bold" textAnchor="middle">
              {elem.protons}+
            </SvgText>
            
            {/* Electron shells with orbits */}
            {electronAngles.map((shellAngles, shellIndex) => {
              const shellRadius = 50 + shellIndex * 35;
              return (
                <G key={`shell${shellIndex}`}>
                  {/* Orbit path */}
                  <Circle
                    cx={centerX}
                    cy={centerY}
                    r={shellRadius}
                    fill="none"
                    stroke={model === 'bohr' ? colors.primary : colors.textMuted}
                    strokeWidth={model === 'bohr' ? 2 : 1}
                    strokeDasharray={model === 'bohr' ? undefined : "4,4"}
                  />
                  {/* Energy level label (Bohr only) */}
                  {model === 'bohr' && (
                    <SvgText
                      x={centerX + shellRadius + 15}
                      y={centerY + 5}
                      fill={colors.textSecondary}
                      fontSize={10}
                    >
                      n={shellIndex + 1}
                    </SvgText>
                  )}
                  {/* Electrons */}
                  {shellAngles.map((angle, i) => (
                    <G key={`e${shellIndex}-${i}`}>
                      {/* Electron trail */}
                      {isAnimating && (
                        <Circle
                          cx={centerX + shellRadius * Math.cos(angle - 0.3)}
                          cy={centerY + shellRadius * Math.sin(angle - 0.3)}
                          r={5}
                          fill="#FBBF24"
                          opacity={0.3}
                        />
                      )}
                      {/* Electron */}
                      <Circle
                        cx={centerX + shellRadius * Math.cos(angle)}
                        cy={centerY + shellRadius * Math.sin(angle)}
                        r={8}
                        fill="#FBBF24"
                        stroke="#F59E0B"
                        strokeWidth={2}
                      />
                      <SvgText
                        x={centerX + shellRadius * Math.cos(angle)}
                        y={centerY + shellRadius * Math.sin(angle) + 4}
                        fill="#92400E"
                        fontSize={8}
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        -
                      </SvgText>
                    </G>
                  ))}
                </G>
              );
            })}
          </G>
        );
        
      case 'quantum':
        return (
          <G>
            {/* Nucleus */}
            <Circle cx={centerX} cy={centerY} r={18} fill={elem.color} />
            <SvgText x={centerX} y={centerY + 4} fill={colors.white} fontSize={10} fontWeight="bold" textAnchor="middle">
              {elem.symbol}
            </SvgText>
            
            {/* Probability clouds */}
            {elem.electrons.map((count, shellIndex) => {
              const baseRadius = 40 + shellIndex * 40;
              return (
                <G key={`cloud${shellIndex}`}>
                  {/* s orbital (spherical cloud) */}
                  <Circle
                    cx={centerX}
                    cy={centerY}
                    r={baseRadius}
                    fill="#FBBF24"
                    opacity={0.15}
                  />
                  <Circle
                    cx={centerX}
                    cy={centerY}
                    r={baseRadius * 0.7}
                    fill="#FBBF24"
                    opacity={0.1}
                  />
                  
                  {/* p orbitals for shell > 1 */}
                  {shellIndex > 0 && count > 2 && (
                    <G>
                      <Ellipse
                        cx={centerX}
                        cy={centerY}
                        rx={baseRadius * 1.3}
                        ry={baseRadius * 0.35}
                        fill="#60A5FA"
                        opacity={0.12}
                      />
                      <Ellipse
                        cx={centerX}
                        cy={centerY}
                        rx={baseRadius * 0.35}
                        ry={baseRadius * 1.3}
                        fill="#34D399"
                        opacity={0.12}
                      />
                    </G>
                  )}
                  
                  {/* Probability dots - animate positions */}
                  {[...Array(count * 5)].map((_, i) => {
                    const time = Date.now() / 1000;
                    const randomSeed = i * 137.5 + shellIndex * 42;
                    const angle = (randomSeed + time * 0.2) % (2 * Math.PI);
                    const r = baseRadius * (0.4 + Math.abs(Math.sin(randomSeed + time * 0.5)) * 0.6);
                    return (
                      <Circle
                        key={`dot${i}`}
                        cx={centerX + r * Math.cos(angle + i * 0.5)}
                        cy={centerY + r * Math.sin(angle + i * 0.5)}
                        r={2.5}
                        fill="#FBBF24"
                        opacity={0.5 + Math.sin(time + i) * 0.3}
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
        <Defs>
          <RadialGradient id="nucleusGlow" cx="50%" cy="50%">
            <Stop offset="0%" stopColor={elem.color} stopOpacity="1" />
            <Stop offset="100%" stopColor={elem.color} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        
        {renderModel()}
        
        {/* Model info header */}
        <G>
          <SvgText x={20} y={25} fill={colors.text} fontSize={15} fontWeight="bold">
            {modelInfo.name} Modeli
          </SvgText>
          <SvgText x={20} y={42} fill={colors.textMuted} fontSize={11}>
            ({modelInfo.year})
          </SvgText>
        </G>
        
        {/* Element info */}
        <G>
          <SvgText x={SVG_WIDTH - 20} y={25} fill={elem.color} fontSize={14} fontWeight="bold" textAnchor="end">
            {elem.name}
          </SvgText>
          <SvgText x={SVG_WIDTH - 20} y={42} fill={colors.textSecondary} fontSize={11} textAnchor="end">
            Proton: {elem.protons} | e⁻: {elem.electrons.reduce((a, b) => a + b, 0)}
          </SvgText>
        </G>
      </Svg>
      
      {/* Description */}
      <View style={styles.descPanel}>
        <Text style={styles.descText}>{modelInfo.description}</Text>
      </View>
      
      {/* Controls */}
      {(model !== 'dalton' && model !== 'quantum') && (
        <View style={styles.controls}>
          <Pressable
            style={({ pressed }) => [
              styles.playBtn,
              isAnimating && styles.playBtnActive,
              pressed && styles.btnPressed
            ]}
            onPress={toggleAnimation}
          >
            <Ionicons
              name={isAnimating ? "pause" : "play"}
              size={24}
              color={colors.white}
            />
            <Text style={styles.playBtnText}>
              {isAnimating ? 'Durdur' : 'Başlat'}
            </Text>
          </Pressable>
        </View>
      )}
      
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
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    cursor: 'pointer' as any,
  },
  playBtnActive: {
    backgroundColor: colors.warning,
  },
  playBtnText: {
    color: colors.white,
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  btnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
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
