import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText, G } from 'react-native-svg';
import { colors } from '../utils/colors';

const { width } = Dimensions.get('window');
const SVG_WIDTH = width - 32;
const SVG_HEIGHT = 280;

interface ProjectileSimulationProps {
  angle: number;
  velocity: number;
  gravity: number;
  isPlaying: boolean;
}

export const ProjectileSimulation: React.FC<ProjectileSimulationProps> = ({
  angle,
  velocity,
  gravity,
}) => {
  const [trajectory, setTrajectory] = useState<{ x: number; y: number }[]>([]);
  
  useEffect(() => {
    calculateTrajectory();
  }, [angle, velocity, gravity]);

  const calculateTrajectory = () => {
    const points: { x: number; y: number }[] = [];
    const rad = (angle * Math.PI) / 180;
    const vx = velocity * Math.cos(rad);
    const vy = velocity * Math.sin(rad);
    
    // Time of flight
    const tFlight = (2 * vy) / gravity;
    const dt = tFlight / 50;
    
    // Scale factors
    const maxRange = (velocity * velocity * Math.sin(2 * rad)) / gravity;
    const maxHeight = (vy * vy) / (2 * gravity);
    const scaleX = (SVG_WIDTH - 60) / Math.max(maxRange, 1);
    const scaleY = (SVG_HEIGHT - 80) / Math.max(maxHeight, 1);
    const scale = Math.min(scaleX, scaleY, 3);
    
    for (let t = 0; t <= tFlight; t += dt) {
      const x = vx * t;
      const y = vy * t - 0.5 * gravity * t * t;
      if (y >= 0) {
        points.push({
          x: 40 + x * scale,
          y: SVG_HEIGHT - 40 - y * scale,
        });
      }
    }
    
    setTrajectory(points);
  };

  const pathData = trajectory.length > 0
    ? `M ${trajectory.map(p => `${p.x},${p.y}`).join(' L ')}`
    : '';

  // Calculate key values
  const rad = (angle * Math.PI) / 180;
  const maxRange = (velocity * velocity * Math.sin(2 * rad)) / gravity;
  const maxHeight = (velocity * Math.sin(rad)) ** 2 / (2 * gravity);
  const flightTime = (2 * velocity * Math.sin(rad)) / gravity;

  return (
    <View style={styles.container}>
      <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        {/* Background grid */}
        {[0, 1, 2, 3, 4].map(i => (
          <Line
            key={`h${i}`}
            x1={40}
            y1={SVG_HEIGHT - 40 - i * 50}
            x2={SVG_WIDTH - 20}
            y2={SVG_HEIGHT - 40 - i * 50}
            stroke={colors.surfaceLight}
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        ))}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <Line
            key={`v${i}`}
            x1={40 + i * 60}
            y1={40}
            x2={40 + i * 60}
            y2={SVG_HEIGHT - 40}
            stroke={colors.surfaceLight}
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        ))}
        
        {/* Axes */}
        <Line x1={40} y1={SVG_HEIGHT - 40} x2={SVG_WIDTH - 20} y2={SVG_HEIGHT - 40} stroke={colors.textSecondary} strokeWidth={2} />
        <Line x1={40} y1={40} x2={40} y2={SVG_HEIGHT - 40} stroke={colors.textSecondary} strokeWidth={2} />
        
        {/* Axis labels */}
        <SvgText x={SVG_WIDTH - 30} y={SVG_HEIGHT - 20} fill={colors.textSecondary} fontSize={12}>x</SvgText>
        <SvgText x={25} y={35} fill={colors.textSecondary} fontSize={12}>y</SvgText>
        
        {/* Launch point */}
        <Circle cx={40} cy={SVG_HEIGHT - 40} r={8} fill={colors.physics} />
        
        {/* Velocity vector */}
        <G>
          <Line
            x1={40}
            y1={SVG_HEIGHT - 40}
            x2={40 + Math.cos(rad) * 50}
            y2={SVG_HEIGHT - 40 - Math.sin(rad) * 50}
            stroke={colors.warning}
            strokeWidth={3}
          />
          <Circle
            cx={40 + Math.cos(rad) * 50}
            cy={SVG_HEIGHT - 40 - Math.sin(rad) * 50}
            r={4}
            fill={colors.warning}
          />
        </G>
        
        {/* Angle arc */}
        <Path
          d={`M 65 ${SVG_HEIGHT - 40} A 25 25 0 0 0 ${40 + Math.cos(rad) * 25} ${SVG_HEIGHT - 40 - Math.sin(rad) * 25}`}
          stroke={colors.success}
          strokeWidth={2}
          fill="none"
        />
        <SvgText x={70} y={SVG_HEIGHT - 50} fill={colors.success} fontSize={12}>{angle}°</SvgText>
        
        {/* Trajectory path */}
        {pathData && (
          <Path
            d={pathData}
            stroke={colors.physics}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
          />
        )}
        
        {/* Landing point */}
        {trajectory.length > 0 && (
          <Circle
            cx={trajectory[trajectory.length - 1]?.x || 40}
            cy={trajectory[trajectory.length - 1]?.y || SVG_HEIGHT - 40}
            r={6}
            fill={colors.error}
          />
        )}
        
        {/* Info box */}
        <G>
          <SvgText x={SVG_WIDTH - 140} y={60} fill={colors.text} fontSize={11} fontWeight="bold">Hesaplamalar:</SvgText>
          <SvgText x={SVG_WIDTH - 140} y={78} fill={colors.textSecondary} fontSize={10}>Menzil: {maxRange.toFixed(1)} m</SvgText>
          <SvgText x={SVG_WIDTH - 140} y={94} fill={colors.textSecondary} fontSize={10}>Max Yük.: {maxHeight.toFixed(1)} m</SvgText>
          <SvgText x={SVG_WIDTH - 140} y={110} fill={colors.textSecondary} fontSize={10}>Uçuş Süresi: {flightTime.toFixed(2)} s</SvgText>
        </G>
      </Svg>
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
});
