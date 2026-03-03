import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Line, Circle, Path, Text as SvgText, G, Polygon } from 'react-native-svg';
import { colors } from '../utils/colors';

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
  const planeLength = 200;
  const planeStartX = 60;
  const planeStartY = SVG_HEIGHT - 60;
  const planeEndX = planeStartX + planeLength * Math.cos(rad);
  const planeEndY = planeStartY - planeLength * Math.sin(rad);
  
  // Box position (middle of plane)
  const boxSize = 40;
  const boxCenterX = planeStartX + (planeLength * 0.5) * Math.cos(rad);
  const boxCenterY = planeStartY - (planeLength * 0.5) * Math.sin(rad);

  // Scale for force vectors
  const forceScale = 0.8;

  return (
    <View style={styles.container}>
      <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        {/* Ground */}
        <Line x1={20} y1={planeStartY + 10} x2={SVG_WIDTH - 20} y2={planeStartY + 10} stroke={colors.surfaceLight} strokeWidth={3} />
        
        {/* Inclined plane */}
        <Line
          x1={planeStartX}
          y1={planeStartY}
          x2={planeEndX}
          y2={planeEndY}
          stroke={colors.textSecondary}
          strokeWidth={4}
        />
        
        {/* Vertical support */}
        <Line
          x1={planeEndX}
          y1={planeEndY}
          x2={planeEndX}
          y2={planeStartY}
          stroke={colors.surfaceLight}
          strokeWidth={2}
          strokeDasharray="5,5"
        />
        
        {/* Angle arc */}
        <Path
          d={`M ${planeStartX + 40} ${planeStartY} A 40 40 0 0 0 ${planeStartX + 40 * Math.cos(rad)} ${planeStartY - 40 * Math.sin(rad)}`}
          stroke={colors.success}
          strokeWidth={2}
          fill="none"
        />
        <SvgText x={planeStartX + 50} y={planeStartY - 10} fill={colors.success} fontSize={12}>{angle}°</SvgText>
        
        {/* Box on the plane */}
        <G transform={`rotate(${-angle}, ${boxCenterX}, ${boxCenterY})`}>
          <Rect
            x={boxCenterX - boxSize/2}
            y={boxCenterY - boxSize}
            width={boxSize}
            height={boxSize}
            fill={colors.physics}
            rx={4}
          />
          <SvgText
            x={boxCenterX}
            y={boxCenterY - boxSize/2 + 5}
            fill={colors.white}
            fontSize={12}
            fontWeight="bold"
            textAnchor="middle"
          >
            {mass}kg
          </SvgText>
        </G>
        
        {/* Weight vector (down) */}
        <Line
          x1={boxCenterX}
          y1={boxCenterY}
          x2={boxCenterX}
          y2={boxCenterY + weight * forceScale}
          stroke={colors.error}
          strokeWidth={3}
        />
        <Polygon
          points={`${boxCenterX},${boxCenterY + weight * forceScale + 8} ${boxCenterX - 6},${boxCenterY + weight * forceScale} ${boxCenterX + 6},${boxCenterY + weight * forceScale}`}
          fill={colors.error}
        />
        <SvgText x={boxCenterX + 10} y={boxCenterY + weight * forceScale * 0.5} fill={colors.error} fontSize={10}>W={weight.toFixed(0)}N</SvgText>
        
        {/* Normal force vector */}
        <Line
          x1={boxCenterX}
          y1={boxCenterY - boxSize}
          x2={boxCenterX - normalForce * forceScale * Math.sin(rad)}
          y2={boxCenterY - boxSize - normalForce * forceScale * Math.cos(rad)}
          stroke={colors.success}
          strokeWidth={3}
        />
        <SvgText
          x={boxCenterX - normalForce * forceScale * Math.sin(rad) - 30}
          y={boxCenterY - boxSize - normalForce * forceScale * Math.cos(rad)}
          fill={colors.success}
          fontSize={10}
        >
          N={normalForce.toFixed(0)}N
        </SvgText>
        
        {/* Friction force */}
        {frictionForce > 0 && (
          <G>
            <Line
              x1={boxCenterX}
              y1={boxCenterY - boxSize/2}
              x2={boxCenterX + frictionForce * forceScale * Math.cos(rad)}
              y2={boxCenterY - boxSize/2 - frictionForce * forceScale * Math.sin(rad)}
              stroke={colors.warning}
              strokeWidth={3}
            />
            <SvgText
              x={boxCenterX + frictionForce * forceScale * Math.cos(rad) + 5}
              y={boxCenterY - boxSize/2 - frictionForce * forceScale * Math.sin(rad)}
              fill={colors.warning}
              fontSize={10}
            >
              f={frictionForce.toFixed(0)}N
            </SvgText>
          </G>
        )}
        
        {/* Info panel */}
        <G>
          <Rect x={SVG_WIDTH - 160} y={20} width={145} height={115} fill={colors.surfaceLight} rx={8} />
          <SvgText x={SVG_WIDTH - 150} y={40} fill={colors.text} fontSize={11} fontWeight="bold">Kuvvet Analizi:</SvgText>
          <SvgText x={SVG_WIDTH - 150} y={58} fill={colors.error} fontSize={10}>Ağırlık: {weight.toFixed(1)} N</SvgText>
          <SvgText x={SVG_WIDTH - 150} y={73} fill={colors.success} fontSize={10}>Normal: {normalForce.toFixed(1)} N</SvgText>
          <SvgText x={SVG_WIDTH - 150} y={88} fill={colors.warning} fontSize={10}>Sürtünme: {frictionForce.toFixed(1)} N</SvgText>
          <SvgText x={SVG_WIDTH - 150} y={103} fill={colors.physics} fontSize={10}>Net Kuvvet: {netForce.toFixed(1)} N</SvgText>
          <SvgText x={SVG_WIDTH - 150} y={118} fill={colors.text} fontSize={10}>a = {acceleration.toFixed(2)} m/s²</SvgText>
          <SvgText x={SVG_WIDTH - 150} y={133} fill={willMove ? colors.success : colors.error} fontSize={10} fontWeight="bold">
            {willMove ? '→ Cisim kayar' : '× Cisim durur'}
          </SvgText>
        </G>
        
        {/* Legend */}
        <G>
          <Circle cx={30} cy={25} r={5} fill={colors.error} />
          <SvgText x={40} y={29} fill={colors.textSecondary} fontSize={10}>Ağırlık</SvgText>
          <Circle cx={100} cy={25} r={5} fill={colors.success} />
          <SvgText x={110} y={29} fill={colors.textSecondary} fontSize={10}>Normal</SvgText>
          <Circle cx={165} cy={25} r={5} fill={colors.warning} />
          <SvgText x={175} y={29} fill={colors.textSecondary} fontSize={10}>Sürtünme</SvgText>
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
