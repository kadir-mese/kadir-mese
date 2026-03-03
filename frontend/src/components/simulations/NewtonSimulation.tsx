import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import Svg, { Rect, Line, Circle, Path, Text as SvgText, G, Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

const { width } = Dimensions.get('window');
const SVG_WIDTH = width - 32;
const SVG_HEIGHT = 280;

interface NewtonSimulationProps {
  mass: number;
  angle: number;
  friction: number;
}

export const NewtonSimulation: React.FC<NewtonSimulationProps> = ({
  mass,
  angle,
  friction,
}) => {
  const [boxPosition, setBoxPosition] = useState(0.3); // 0-1 along the plane
  const [velocity, setVelocity] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const rad = (angle * Math.PI) / 180;
  const g = 9.8;
  
  // Force calculations
  const weight = mass * g;
  const normalForce = weight * Math.cos(rad);
  const gravityComponent = weight * Math.sin(rad);
  const frictionForce = friction * normalForce;
  const netForce = gravityComponent - frictionForce;
  const acceleration = netForce / mass;
  const willMove = netForce > 0;

  // Plane dimensions
  const planeLength = 220;
  const planeStartX = 50;
  const planeStartY = SVG_HEIGHT - 50;
  const planeEndX = planeStartX + planeLength * Math.cos(rad);
  const planeEndY = planeStartY - planeLength * Math.sin(rad);
  
  // Box dimensions
  const boxSize = 36;
  
  // Get box position on plane
  const getBoxPosition = (t: number) => {
    const distance = t * planeLength;
    const x = planeStartX + distance * Math.cos(rad);
    const y = planeStartY - distance * Math.sin(rad);
    return { x, y, distance };
  };

  const boxPos = getBoxPosition(boxPosition);

  useEffect(() => {
    resetAnimation();
  }, [mass, angle, friction]);

  const resetAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setBoxPosition(0.3);
    setVelocity(0);
    setIsAnimating(false);
  };

  const startAnimation = () => {
    if (!willMove) {
      // Object won't move, show a shake animation
      shakeAnimation();
      return;
    }
    
    setIsAnimating(true);
    lastTimeRef.current = performance.now();
    
    let currentPos = boxPosition;
    let currentVel = velocity;
    
    const animate = (timestamp: number) => {
      const dt = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;
      
      // Physics simulation
      const timeScale = 0.3; // Slow down for visualization
      currentVel += acceleration * dt * timeScale;
      currentPos += (currentVel / planeLength) * dt * timeScale;
      
      if (currentPos >= 1) {
        setBoxPosition(1);
        setVelocity(currentVel);
        setIsAnimating(false);
        return;
      }
      
      if (currentPos <= 0) {
        setBoxPosition(0);
        setVelocity(0);
        setIsAnimating(false);
        return;
      }
      
      setBoxPosition(currentPos);
      setVelocity(currentVel);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const shakeAnimation = () => {
    const startPos = boxPosition;
    const startTime = performance.now();
    
    const shake = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      if (elapsed > 500) {
        setBoxPosition(startPos);
        return;
      }
      
      const offset = Math.sin(elapsed * 0.05) * 0.01 * (1 - elapsed / 500);
      setBoxPosition(startPos + offset);
      animationRef.current = requestAnimationFrame(shake);
    };
    
    animationRef.current = requestAnimationFrame(shake);
  };

  const toggleAnimation = () => {
    if (isAnimating) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setIsAnimating(false);
    } else {
      startAnimation();
    }
  };

  // Force vector scale
  const forceScale = 0.6;

  return (
    <View style={styles.container}>
      <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        <Defs>
          <LinearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#4B5563" />
            <Stop offset="100%" stopColor="#374151" />
          </LinearGradient>
          <LinearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#60A5FA" />
            <Stop offset="100%" stopColor="#3B82F6" />
          </LinearGradient>
        </Defs>
        
        {/* Ground */}
        <Rect x={20} y={planeStartY} width={SVG_WIDTH - 40} height={15} fill="#4ADE80" rx={3} />
        
        {/* Inclined plane */}
        <G>
          <Path
            d={`M ${planeStartX} ${planeStartY} 
                L ${planeEndX} ${planeEndY} 
                L ${planeEndX} ${planeStartY} Z`}
            fill="url(#planeGradient)"
            stroke={colors.textSecondary}
            strokeWidth={2}
          />
          {/* Plane surface line */}
          <Line
            x1={planeStartX}
            y1={planeStartY}
            x2={planeEndX}
            y2={planeEndY}
            stroke={colors.textMuted}
            strokeWidth={4}
          />
        </G>
        
        {/* Angle arc */}
        <Path
          d={`M ${planeStartX + 50} ${planeStartY} A 50 50 0 0 0 ${planeStartX + 50 * Math.cos(rad)} ${planeStartY - 50 * Math.sin(rad)}`}
          stroke={colors.success}
          strokeWidth={2}
          fill="none"
        />
        <SvgText x={planeStartX + 60} y={planeStartY - 15} fill={colors.success} fontSize={14} fontWeight="bold">
          {angle}°
        </SvgText>
        
        {/* Box on the plane */}
        <G transform={`rotate(${-angle}, ${boxPos.x}, ${boxPos.y})`}>
          <Rect
            x={boxPos.x - boxSize/2}
            y={boxPos.y - boxSize}
            width={boxSize}
            height={boxSize}
            fill="url(#boxGradient)"
            rx={4}
            stroke="#2563EB"
            strokeWidth={2}
          />
          {/* Mass label */}
          <SvgText
            x={boxPos.x}
            y={boxPos.y - boxSize/2 + 5}
            fill={colors.white}
            fontSize={12}
            fontWeight="bold"
            textAnchor="middle"
          >
            {mass}kg
          </SvgText>
        </G>
        
        {/* Force vectors */}
        <G>
          {/* Weight vector (down) */}
          <Line
            x1={boxPos.x}
            y1={boxPos.y - boxSize/2}
            x2={boxPos.x}
            y2={boxPos.y - boxSize/2 + weight * forceScale}
            stroke="#EF4444"
            strokeWidth={3}
          />
          <Polygon
            points={`${boxPos.x},${boxPos.y - boxSize/2 + weight * forceScale + 8} ${boxPos.x - 6},${boxPos.y - boxSize/2 + weight * forceScale} ${boxPos.x + 6},${boxPos.y - boxSize/2 + weight * forceScale}`}
            fill="#EF4444"
          />
          
          {/* Normal force */}
          <Line
            x1={boxPos.x}
            y1={boxPos.y - boxSize}
            x2={boxPos.x - normalForce * forceScale * Math.sin(rad) * 0.7}
            y2={boxPos.y - boxSize - normalForce * forceScale * Math.cos(rad) * 0.7}
            stroke="#10B981"
            strokeWidth={3}
          />
          
          {/* Friction force (if moving) */}
          {willMove && frictionForce > 0 && (
            <Line
              x1={boxPos.x}
              y1={boxPos.y - boxSize/2}
              x2={boxPos.x + frictionForce * forceScale * Math.cos(rad) * 0.8}
              y2={boxPos.y - boxSize/2 - frictionForce * forceScale * Math.sin(rad) * 0.8}
              stroke="#F59E0B"
              strokeWidth={3}
            />
          )}
          
          {/* Net force arrow (if moving) */}
          {willMove && (
            <G>
              <Line
                x1={boxPos.x}
                y1={boxPos.y - boxSize - 10}
                x2={boxPos.x - netForce * forceScale * 0.5 * Math.cos(rad)}
                y2={boxPos.y - boxSize - 10 + netForce * forceScale * 0.5 * Math.sin(rad)}
                stroke="#8B5CF6"
                strokeWidth={4}
                strokeDasharray="6,3"
              />
            </G>
          )}
        </G>
        
        {/* Info panel */}
        <G>
          <Rect x={SVG_WIDTH - 155} y={15} width={140} height={130} fill={colors.surfaceLight} rx={10} />
          <SvgText x={SVG_WIDTH - 145} y={35} fill={colors.text} fontSize={12} fontWeight="bold">⚡ Kuvvet Analizi</SvgText>
          
          <Circle cx={SVG_WIDTH - 140} cy={52} r={4} fill="#EF4444" />
          <SvgText x={SVG_WIDTH - 130} y={56} fill={colors.textSecondary} fontSize={10}>W = {weight.toFixed(0)} N</SvgText>
          
          <Circle cx={SVG_WIDTH - 140} cy={70} r={4} fill="#10B981" />
          <SvgText x={SVG_WIDTH - 130} y={74} fill={colors.textSecondary} fontSize={10}>N = {normalForce.toFixed(0)} N</SvgText>
          
          <Circle cx={SVG_WIDTH - 140} cy={88} r={4} fill="#F59E0B" />
          <SvgText x={SVG_WIDTH - 130} y={92} fill={colors.textSecondary} fontSize={10}>f = {frictionForce.toFixed(0)} N</SvgText>
          
          <Line x1={SVG_WIDTH - 145} y1={100} x2={SVG_WIDTH - 25} y2={100} stroke={colors.border} strokeWidth={1} />
          
          <SvgText x={SVG_WIDTH - 145} y={116} fill={colors.primary} fontSize={11} fontWeight="bold">
            Fnet = {netForce.toFixed(1)} N
          </SvgText>
          <SvgText x={SVG_WIDTH - 145} y={132} fill={colors.text} fontSize={10}>
            a = {acceleration.toFixed(2)} m/s²
          </SvgText>
        </G>
        
        {/* Status indicator */}
        <G>
          <Rect 
            x={20} 
            y={15} 
            width={willMove ? 95 : 85} 
            height={28} 
            fill={willMove ? colors.success + '30' : colors.error + '30'} 
            rx={14} 
          />
          <SvgText 
            x={willMove ? 67 : 62} 
            y={34} 
            fill={willMove ? colors.success : colors.error} 
            fontSize={12} 
            fontWeight="bold"
            textAnchor="middle"
          >
            {willMove ? '→ Kayıyor' : '✕ Durgun'}
          </SvgText>
        </G>
        
        {/* Velocity indicator */}
        {isAnimating && (
          <G>
            <SvgText x={20} y={60} fill={colors.physics} fontSize={11}>
              v = {velocity.toFixed(1)} m/s
            </SvgText>
          </G>
        )}
      </Svg>
      
      {/* Animation Controls */}
      <View style={styles.controls}>
        <Pressable
          style={({ pressed }) => [styles.controlBtn, pressed && styles.btnPressed]}
          onPress={resetAnimation}
        >
          <Ionicons name="refresh" size={20} color={colors.text} />
        </Pressable>
        
        <Pressable
          style={({ pressed }) => [
            styles.playBtn, 
            isAnimating && styles.playBtnActive,
            !willMove && styles.playBtnDisabled,
            pressed && styles.btnPressed
          ]}
          onPress={toggleAnimation}
        >
          <Ionicons 
            name={isAnimating ? "pause" : "play"} 
            size={28} 
            color={colors.white} 
          />
        </Pressable>
        
        <View style={styles.speedInfo}>
          <Text style={styles.speedLabel}>Hız</Text>
          <Text style={styles.speedValue}>{velocity.toFixed(1)} m/s</Text>
        </View>
      </View>
      
      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.legendText}>Ağırlık</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>Normal</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
          <Text style={styles.legendText}>Sürtünme</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#8B5CF6' }]} />
          <Text style={styles.legendText}>Net</Text>
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
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 16,
  },
  controlBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer' as any,
  },
  playBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer' as any,
  },
  playBtnActive: {
    backgroundColor: colors.warning,
  },
  playBtnDisabled: {
    backgroundColor: colors.textMuted,
  },
  btnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  speedInfo: {
    alignItems: 'center',
    minWidth: 60,
  },
  speedLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  speedValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.physics,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 2,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  legendText: {
    fontSize: 11,
    color: colors.textMuted,
  },
});
