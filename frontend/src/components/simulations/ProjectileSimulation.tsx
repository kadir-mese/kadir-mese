import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText, G, Defs, RadialGradient, Stop } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

const { width } = Dimensions.get('window');
const SVG_WIDTH = width - 32;
const SVG_HEIGHT = 280;

interface ProjectileSimulationProps {
  angle: number;
  velocity: number;
  gravity: number;
  isPlaying?: boolean;
}

export const ProjectileSimulation: React.FC<ProjectileSimulationProps> = ({
  angle,
  velocity,
  gravity,
}) => {
  const [trajectory, setTrajectory] = useState<{ x: number; y: number }[]>([]);
  const [ballPosition, setBallPosition] = useState<{ x: number; y: number } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTrail, setShowTrail] = useState(true);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  
  // Physics calculations
  const rad = (angle * Math.PI) / 180;
  const vx = velocity * Math.cos(rad);
  const vy = velocity * Math.sin(rad);
  const tFlight = (2 * vy) / gravity;
  const maxRange = (velocity * velocity * Math.sin(2 * rad)) / gravity;
  const maxHeight = (vy * vy) / (2 * gravity);
  
  // Scale calculation
  const scaleX = (SVG_WIDTH - 80) / Math.max(maxRange, 1);
  const scaleY = (SVG_HEIGHT - 100) / Math.max(maxHeight, 1);
  const scale = Math.min(scaleX, scaleY, 2.5);
  
  useEffect(() => {
    calculateTrajectory();
    resetAnimation();
  }, [angle, velocity, gravity]);

  const calculateTrajectory = () => {
    const points: { x: number; y: number }[] = [];
    const dt = tFlight / 60;
    
    for (let t = 0; t <= tFlight; t += dt) {
      const x = vx * t;
      const y = vy * t - 0.5 * gravity * t * t;
      if (y >= 0) {
        points.push({
          x: 50 + x * scale,
          y: SVG_HEIGHT - 50 - y * scale,
        });
      }
    }
    
    setTrajectory(points);
  };

  const getPositionAtTime = (t: number) => {
    const x = vx * t;
    const y = vy * t - 0.5 * gravity * t * t;
    return {
      x: 50 + x * scale,
      y: SVG_HEIGHT - 50 - Math.max(0, y) * scale,
    };
  };

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    startTimeRef.current = performance.now() - (currentTime * 1000);
    
    const animate = (timestamp: number) => {
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const animSpeed = 0.5; // Slow down for better visualization
      const t = elapsed * animSpeed;
      
      if (t >= tFlight) {
        setCurrentTime(tFlight);
        setBallPosition(getPositionAtTime(tFlight));
        setIsAnimating(false);
        return;
      }
      
      setCurrentTime(t);
      setBallPosition(getPositionAtTime(t));
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const pauseAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setIsAnimating(false);
  };

  const resetAnimation = () => {
    pauseAnimation();
    setCurrentTime(0);
    setBallPosition({ x: 50, y: SVG_HEIGHT - 50 });
  };

  const toggleAnimation = () => {
    if (isAnimating) {
      pauseAnimation();
    } else {
      if (currentTime >= tFlight) {
        resetAnimation();
        setTimeout(startAnimation, 100);
      } else {
        startAnimation();
      }
    }
  };

  // Initialize ball position
  useEffect(() => {
    setBallPosition({ x: 50, y: SVG_HEIGHT - 50 });
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const pathData = trajectory.length > 0
    ? `M ${trajectory.map(p => `${p.x},${p.y}`).join(' L ')}`
    : '';

  // Trail points (show where the ball has been)
  const trailPoints = trajectory.filter((_, i) => {
    const pointTime = (i / trajectory.length) * tFlight;
    return pointTime <= currentTime;
  });

  const currentVelocityY = vy - gravity * currentTime;
  const currentVelocity = Math.sqrt(vx * vx + currentVelocityY * currentVelocityY);
  const currentAngle = Math.atan2(currentVelocityY, vx) * (180 / Math.PI);

  return (
    <View style={styles.container}>
      <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        <Defs>
          <RadialGradient id="ballGradient" cx="30%" cy="30%">
            <Stop offset="0%" stopColor="#FF6B6B" />
            <Stop offset="100%" stopColor="#C0392B" />
          </RadialGradient>
        </Defs>
        
        {/* Background grid */}
        {[0, 1, 2, 3, 4].map(i => (
          <Line
            key={`h${i}`}
            x1={50}
            y1={SVG_HEIGHT - 50 - i * 45}
            x2={SVG_WIDTH - 20}
            y2={SVG_HEIGHT - 50 - i * 45}
            stroke={colors.surfaceLight}
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        ))}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <Line
            key={`v${i}`}
            x1={50 + i * 55}
            y1={50}
            x2={50 + i * 55}
            y2={SVG_HEIGHT - 50}
            stroke={colors.surfaceLight}
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        ))}
        
        {/* Axes */}
        <Line x1={50} y1={SVG_HEIGHT - 50} x2={SVG_WIDTH - 20} y2={SVG_HEIGHT - 50} stroke={colors.textSecondary} strokeWidth={2} />
        <Line x1={50} y1={50} x2={50} y2={SVG_HEIGHT - 50} stroke={colors.textSecondary} strokeWidth={2} />
        
        {/* Ground */}
        <Line x1={20} y1={SVG_HEIGHT - 48} x2={SVG_WIDTH - 10} y2={SVG_HEIGHT - 48} stroke="#4ADE80" strokeWidth={4} />
        
        {/* Trajectory path (ghost) */}
        {pathData && (
          <Path
            d={pathData}
            stroke={colors.physics}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            opacity={0.3}
            strokeDasharray="8,4"
          />
        )}
        
        {/* Trail - where ball has been */}
        {showTrail && trailPoints.length > 1 && (
          <Path
            d={`M ${trailPoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
            stroke="#3B82F6"
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
          />
        )}
        
        {/* Trail dots */}
        {showTrail && trailPoints.filter((_, i) => i % 4 === 0).map((point, i) => (
          <Circle
            key={`trail${i}`}
            cx={point.x}
            cy={point.y}
            r={3}
            fill="#3B82F6"
            opacity={0.5 + (i / trailPoints.length) * 0.5}
          />
        ))}
        
        {/* Launch cannon/base */}
        <G>
          <Circle cx={50} cy={SVG_HEIGHT - 50} r={15} fill={colors.surfaceLight} />
          <Line
            x1={50}
            y1={SVG_HEIGHT - 50}
            x2={50 + Math.cos(rad) * 30}
            y2={SVG_HEIGHT - 50 - Math.sin(rad) * 30}
            stroke={colors.textSecondary}
            strokeWidth={8}
            strokeLinecap="round"
          />
        </G>
        
        {/* Velocity vector at current position */}
        {ballPosition && currentTime > 0 && currentTime < tFlight && (
          <G>
            <Line
              x1={ballPosition.x}
              y1={ballPosition.y}
              x2={ballPosition.x + vx * 0.4}
              y2={ballPosition.y - currentVelocityY * 0.4}
              stroke="#F59E0B"
              strokeWidth={2}
            />
            <Circle
              cx={ballPosition.x + vx * 0.4}
              cy={ballPosition.y - currentVelocityY * 0.4}
              r={3}
              fill="#F59E0B"
            />
          </G>
        )}
        
        {/* The ball/projectile */}
        {ballPosition && (
          <G>
            {/* Shadow */}
            <Ellipse
              cx={ballPosition.x}
              cy={SVG_HEIGHT - 48}
              rx={12 * Math.max(0.3, 1 - (SVG_HEIGHT - 50 - ballPosition.y) / 200)}
              ry={4}
              fill="rgba(0,0,0,0.3)"
            />
            {/* Ball */}
            <Circle
              cx={ballPosition.x}
              cy={ballPosition.y}
              r={12}
              fill="url(#ballGradient)"
            />
            {/* Highlight */}
            <Circle
              cx={ballPosition.x - 3}
              cy={ballPosition.y - 3}
              r={4}
              fill="rgba(255,255,255,0.4)"
            />
          </G>
        )}
        
        {/* Landing point marker */}
        {trajectory.length > 0 && (
          <G>
            <Circle
              cx={trajectory[trajectory.length - 1]?.x || 50}
              cy={SVG_HEIGHT - 50}
              r={8}
              fill="none"
              stroke="#EF4444"
              strokeWidth={2}
              strokeDasharray="4,2"
            />
            <Line
              x1={(trajectory[trajectory.length - 1]?.x || 50) - 5}
              y1={SVG_HEIGHT - 50}
              x2={(trajectory[trajectory.length - 1]?.x || 50) + 5}
              y2={SVG_HEIGHT - 50}
              stroke="#EF4444"
              strokeWidth={2}
            />
          </G>
        )}
        
        {/* Info box */}
        <G>
          <SvgText x={SVG_WIDTH - 130} y={25} fill={colors.text} fontSize={11} fontWeight="bold">📊 Hesaplamalar</SvgText>
          <SvgText x={SVG_WIDTH - 130} y={43} fill={colors.textSecondary} fontSize={10}>Menzil: {maxRange.toFixed(1)} m</SvgText>
          <SvgText x={SVG_WIDTH - 130} y={58} fill={colors.textSecondary} fontSize={10}>Max Yük.: {maxHeight.toFixed(1)} m</SvgText>
          <SvgText x={SVG_WIDTH - 130} y={73} fill={colors.textSecondary} fontSize={10}>Uçuş: {tFlight.toFixed(2)} s</SvgText>
          <SvgText x={SVG_WIDTH - 130} y={93} fill={colors.warning} fontSize={10}>t = {currentTime.toFixed(2)} s</SvgText>
          <SvgText x={SVG_WIDTH - 130} y={108} fill={colors.physics} fontSize={10}>v = {currentVelocity.toFixed(1)} m/s</SvgText>
        </G>
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
        
        <Pressable
          style={({ pressed }) => [
            styles.controlBtn, 
            showTrail && styles.controlBtnActive,
            pressed && styles.btnPressed
          ]}
          onPress={() => setShowTrail(!showTrail)}
        >
          <Ionicons name="analytics" size={20} color={showTrail ? colors.primary : colors.text} />
        </Pressable>
      </View>
      
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${Math.min(100, (currentTime / tFlight) * 100)}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {((currentTime / tFlight) * 100).toFixed(0)}%
        </Text>
      </View>
    </View>
  );
};

// Missing Ellipse import - adding inline
const Ellipse = ({ cx, cy, rx, ry, fill }: any) => (
  <Circle cx={cx} cy={cy} r={Math.max(rx, ry)} fill={fill} transform={`scale(${rx/Math.max(rx,ry)}, ${ry/Math.max(rx,ry)})`} />
);

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
  controlBtnActive: {
    backgroundColor: colors.primary + '30',
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
  btnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
    paddingHorizontal: 8,
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
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: 8,
    width: 35,
  },
});
