import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import Svg, { Circle, Ellipse, Rect, Line, Text as SvgText, G, Path } from 'react-native-svg';
import { colors } from '../../utils/colors';

const { width } = Dimensions.get('window');
const SVG_WIDTH = width - 32;
const SVG_HEIGHT = 320;

interface CellSimulationProps {
  cellType: 'animal' | 'plant';
  zoom: number;
}

interface Organelle {
  id: string;
  name: string;
  name_tr: string;
  description: string;
  color: string;
  x: number;
  y: number;
  size: number;
  shape: 'circle' | 'ellipse' | 'rect' | 'custom';
}

const ORGANELLES: Record<string, Organelle[]> = {
  animal: [
    { id: 'nucleus', name: 'Nucleus', name_tr: 'Çekirdek', description: 'DNA\'yı içerir, hücrenin kontrol merkezi', color: '#8B5CF6', x: SVG_WIDTH/2, y: SVG_HEIGHT/2, size: 45, shape: 'circle' },
    { id: 'mitochondria1', name: 'Mitochondria', name_tr: 'Mitokondri', description: 'Hücrenin enerji santrali, ATP üretir', color: '#EF4444', x: SVG_WIDTH/2 - 80, y: SVG_HEIGHT/2 - 40, size: 25, shape: 'ellipse' },
    { id: 'mitochondria2', name: 'Mitochondria', name_tr: 'Mitokondri', description: 'Hücrenin enerji santrali, ATP üretir', color: '#EF4444', x: SVG_WIDTH/2 + 60, y: SVG_HEIGHT/2 + 50, size: 22, shape: 'ellipse' },
    { id: 'er', name: 'Endoplasmic Reticulum', name_tr: 'Endoplazmik Retikulum', description: 'Protein ve lipit sentezi yapar', color: '#F59E0B', x: SVG_WIDTH/2 - 60, y: SVG_HEIGHT/2 + 60, size: 30, shape: 'custom' },
    { id: 'golgi', name: 'Golgi Apparatus', name_tr: 'Golgi Aygıtı', description: 'Proteinleri paketler ve dağıtır', color: '#10B981', x: SVG_WIDTH/2 + 70, y: SVG_HEIGHT/2 - 50, size: 28, shape: 'custom' },
    { id: 'ribosome1', name: 'Ribosome', name_tr: 'Ribozom', description: 'Protein sentezler', color: '#3B82F6', x: SVG_WIDTH/2 - 30, y: SVG_HEIGHT/2 - 70, size: 8, shape: 'circle' },
    { id: 'ribosome2', name: 'Ribosome', name_tr: 'Ribozom', description: 'Protein sentezler', color: '#3B82F6', x: SVG_WIDTH/2 + 40, y: SVG_HEIGHT/2 - 60, size: 8, shape: 'circle' },
    { id: 'lysosome', name: 'Lysosome', name_tr: 'Lizozom', description: 'Sindirici enzimler içerir', color: '#EC4899', x: SVG_WIDTH/2 - 90, y: SVG_HEIGHT/2 + 20, size: 18, shape: 'circle' },
    { id: 'centrosome', name: 'Centrosome', name_tr: 'Sentrozom', description: 'Hücre bölünmesinde rol oynar', color: '#6366F1', x: SVG_WIDTH/2 + 20, y: SVG_HEIGHT/2 - 30, size: 12, shape: 'circle' },
  ],
  plant: [
    { id: 'nucleus', name: 'Nucleus', name_tr: 'Çekirdek', description: 'DNA\'yı içerir, hücrenin kontrol merkezi', color: '#8B5CF6', x: SVG_WIDTH/2, y: SVG_HEIGHT/2 + 20, size: 40, shape: 'circle' },
    { id: 'chloroplast1', name: 'Chloroplast', name_tr: 'Kloroplast', description: 'Fotosentez yapar, güneş enerjisini kimyasal enerjiye dönüştürür', color: '#22C55E', x: SVG_WIDTH/2 - 70, y: SVG_HEIGHT/2 - 30, size: 30, shape: 'ellipse' },
    { id: 'chloroplast2', name: 'Chloroplast', name_tr: 'Kloroplast', description: 'Fotosentez yapar', color: '#22C55E', x: SVG_WIDTH/2 + 60, y: SVG_HEIGHT/2 + 40, size: 28, shape: 'ellipse' },
    { id: 'vacuole', name: 'Central Vacuole', name_tr: 'Merkezi Koful', description: 'Su ve besin depolar, hücreye destek sağlar', color: '#06B6D4', x: SVG_WIDTH/2 - 20, y: SVG_HEIGHT/2 - 40, size: 55, shape: 'ellipse' },
    { id: 'mitochondria1', name: 'Mitochondria', name_tr: 'Mitokondri', description: 'Hücrenin enerji santrali', color: '#EF4444', x: SVG_WIDTH/2 + 80, y: SVG_HEIGHT/2 - 20, size: 20, shape: 'ellipse' },
    { id: 'er', name: 'Endoplasmic Reticulum', name_tr: 'Endoplazmik Retikulum', description: 'Protein ve lipit sentezi', color: '#F59E0B', x: SVG_WIDTH/2 - 60, y: SVG_HEIGHT/2 + 60, size: 25, shape: 'custom' },
    { id: 'golgi', name: 'Golgi Apparatus', name_tr: 'Golgi Aygıtı', description: 'Proteinleri paketler', color: '#10B981', x: SVG_WIDTH/2 + 50, y: SVG_HEIGHT/2 - 60, size: 24, shape: 'custom' },
  ],
};

export const CellSimulation: React.FC<CellSimulationProps> = ({ cellType, zoom }) => {
  const [selectedOrganelle, setSelectedOrganelle] = useState<Organelle | null>(null);
  const organelles = ORGANELLES[cellType];
  const scale = 0.8 + (zoom - 1) * 0.15;

  const renderOrganelle = (org: Organelle) => {
    const isSelected = selectedOrganelle?.id === org.id;
    const scaledSize = org.size * scale;
    
    switch (org.shape) {
      case 'ellipse':
        return (
          <G key={org.id}>
            <Ellipse
              cx={org.x}
              cy={org.y}
              rx={scaledSize * 1.4}
              ry={scaledSize * 0.7}
              fill={org.color}
              opacity={isSelected ? 1 : 0.85}
              stroke={isSelected ? colors.white : 'none'}
              strokeWidth={isSelected ? 2 : 0}
              onPress={() => setSelectedOrganelle(org)}
            />
            {org.id.includes('chloroplast') && (
              <G>
                {[-1, 0, 1].map(i => (
                  <Line
                    key={i}
                    x1={org.x - scaledSize}
                    y1={org.y + i * 8}
                    x2={org.x + scaledSize}
                    y2={org.y + i * 8}
                    stroke="#15803D"
                    strokeWidth={2}
                  />
                ))}
              </G>
            )}
          </G>
        );
      case 'custom':
        if (org.id === 'er') {
          return (
            <G key={org.id}>
              <Path
                d={`M ${org.x - scaledSize} ${org.y} 
                   Q ${org.x - scaledSize/2} ${org.y - scaledSize/2} ${org.x} ${org.y}
                   Q ${org.x + scaledSize/2} ${org.y + scaledSize/2} ${org.x + scaledSize} ${org.y}
                   Q ${org.x + scaledSize/2} ${org.y - scaledSize/3} ${org.x} ${org.y + scaledSize/3}`}
                stroke={org.color}
                strokeWidth={4}
                fill="none"
                opacity={isSelected ? 1 : 0.85}
                onPress={() => setSelectedOrganelle(org)}
              />
            </G>
          );
        }
        if (org.id === 'golgi') {
          return (
            <G key={org.id}>
              {[0, 1, 2, 3].map(i => (
                <Path
                  key={i}
                  d={`M ${org.x - scaledSize} ${org.y - scaledSize/2 + i * 8}
                     Q ${org.x} ${org.y - scaledSize/2 + i * 8 + (i % 2 === 0 ? 5 : -5)} ${org.x + scaledSize} ${org.y - scaledSize/2 + i * 8}`}
                  stroke={org.color}
                  strokeWidth={3}
                  fill="none"
                  opacity={isSelected ? 1 : 0.85}
                />
              ))}
              <Rect
                x={org.x - scaledSize - 5}
                y={org.y - scaledSize/2 - 5}
                width={scaledSize * 2 + 10}
                height={scaledSize + 10}
                fill="transparent"
                onPress={() => setSelectedOrganelle(org)}
              />
            </G>
          );
        }
        return null;
      default:
        return (
          <Circle
            key={org.id}
            cx={org.x}
            cy={org.y}
            r={scaledSize}
            fill={org.color}
            opacity={isSelected ? 1 : 0.85}
            stroke={isSelected ? colors.white : 'none'}
            strokeWidth={isSelected ? 2 : 0}
            onPress={() => setSelectedOrganelle(org)}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        {/* Cell wall (plant only) */}
        {cellType === 'plant' && (
          <Rect
            x={20}
            y={20}
            width={SVG_WIDTH - 40}
            height={SVG_HEIGHT - 40}
            fill="none"
            stroke="#84CC16"
            strokeWidth={8}
            rx={10}
          />
        )}
        
        {/* Cell membrane */}
        <Ellipse
          cx={SVG_WIDTH / 2}
          cy={SVG_HEIGHT / 2}
          rx={(SVG_WIDTH / 2 - 40) * scale}
          ry={(SVG_HEIGHT / 2 - 40) * scale}
          fill={cellType === 'plant' ? '#ECFCCB' : '#FEF3C7'}
          stroke={cellType === 'plant' ? '#65A30D' : '#F59E0B'}
          strokeWidth={3}
        />
        
        {/* Cytoplasm dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Circle
            key={`dot${i}`}
            cx={SVG_WIDTH/4 + Math.random() * SVG_WIDTH/2}
            cy={SVG_HEIGHT/4 + Math.random() * SVG_HEIGHT/2}
            r={2}
            fill={colors.textMuted}
            opacity={0.3}
          />
        ))}
        
        {/* Organelles */}
        {organelles.map(renderOrganelle)}
        
        {/* Labels */}
        <SvgText x={SVG_WIDTH/2} y={25} fill={colors.text} fontSize={14} fontWeight="bold" textAnchor="middle">
          {cellType === 'plant' ? 'Bitki Hücresi' : 'Hayvan Hücresi'}
        </SvgText>
      </Svg>
      
      {/* Info panel */}
      {selectedOrganelle && (
        <View style={styles.infoPanel}>
          <View style={[styles.colorDot, { backgroundColor: selectedOrganelle.color }]} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>{selectedOrganelle.name_tr}</Text>
            <Text style={styles.infoDesc}>{selectedOrganelle.description}</Text>
          </View>
          <Pressable onPress={() => setSelectedOrganelle(null)} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>×</Text>
          </Pressable>
        </View>
      )}
      
      {!selectedOrganelle && (
        <Text style={styles.hint}>Organellere dokunarak bilgi alın</Text>
      )}
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
  infoPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    width: '100%',
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  infoDesc: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  closeBtn: {
    padding: 4,
  },
  closeBtnText: {
    fontSize: 20,
    color: colors.textMuted,
  },
  hint: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 8,
  },
});
