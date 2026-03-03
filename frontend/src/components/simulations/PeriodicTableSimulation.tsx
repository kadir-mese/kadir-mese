import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Svg, { Rect, Text as SvgText, G } from 'react-native-svg';
import { colors } from '../utils/colors';

const { width } = Dimensions.get('window');
const SVG_WIDTH = width - 32;
const CELL_SIZE = Math.floor((SVG_WIDTH - 20) / 18);
const SVG_HEIGHT = CELL_SIZE * 10 + 40;

interface PeriodicTableProps {
  view: string;
  highlight: string;
}

interface Element {
  symbol: string;
  name: string;
  name_tr: string;
  number: number;
  mass: number;
  category: string;
  group: number;
  period: number;
  electronegativity?: number;
  electron_config?: string;
}

// Simplified periodic table data (first 36 elements)
const ELEMENTS: Element[] = [
  { symbol: 'H', name: 'Hydrogen', name_tr: 'Hidrojen', number: 1, mass: 1.008, category: 'nonmetal', group: 1, period: 1, electronegativity: 2.2, electron_config: '1s1' },
  { symbol: 'He', name: 'Helium', name_tr: 'Helyum', number: 2, mass: 4.003, category: 'noble', group: 18, period: 1, electron_config: '1s2' },
  { symbol: 'Li', name: 'Lithium', name_tr: 'Lityum', number: 3, mass: 6.94, category: 'metal', group: 1, period: 2, electronegativity: 0.98, electron_config: '[He]2s1' },
  { symbol: 'Be', name: 'Beryllium', name_tr: 'Berilyum', number: 4, mass: 9.012, category: 'metal', group: 2, period: 2, electronegativity: 1.57, electron_config: '[He]2s2' },
  { symbol: 'B', name: 'Boron', name_tr: 'Bor', number: 5, mass: 10.81, category: 'metalloid', group: 13, period: 2, electronegativity: 2.04, electron_config: '[He]2s22p1' },
  { symbol: 'C', name: 'Carbon', name_tr: 'Karbon', number: 6, mass: 12.01, category: 'nonmetal', group: 14, period: 2, electronegativity: 2.55, electron_config: '[He]2s22p2' },
  { symbol: 'N', name: 'Nitrogen', name_tr: 'Azot', number: 7, mass: 14.01, category: 'nonmetal', group: 15, period: 2, electronegativity: 3.04, electron_config: '[He]2s22p3' },
  { symbol: 'O', name: 'Oxygen', name_tr: 'Oksijen', number: 8, mass: 16.00, category: 'nonmetal', group: 16, period: 2, electronegativity: 3.44, electron_config: '[He]2s22p4' },
  { symbol: 'F', name: 'Fluorine', name_tr: 'Flor', number: 9, mass: 19.00, category: 'nonmetal', group: 17, period: 2, electronegativity: 3.98, electron_config: '[He]2s22p5' },
  { symbol: 'Ne', name: 'Neon', name_tr: 'Neon', number: 10, mass: 20.18, category: 'noble', group: 18, period: 2, electron_config: '[He]2s22p6' },
  { symbol: 'Na', name: 'Sodium', name_tr: 'Sodyum', number: 11, mass: 22.99, category: 'metal', group: 1, period: 3, electronegativity: 0.93, electron_config: '[Ne]3s1' },
  { symbol: 'Mg', name: 'Magnesium', name_tr: 'Magnezyum', number: 12, mass: 24.31, category: 'metal', group: 2, period: 3, electronegativity: 1.31, electron_config: '[Ne]3s2' },
  { symbol: 'Al', name: 'Aluminum', name_tr: 'Alüminyum', number: 13, mass: 26.98, category: 'metal', group: 13, period: 3, electronegativity: 1.61, electron_config: '[Ne]3s23p1' },
  { symbol: 'Si', name: 'Silicon', name_tr: 'Silisyum', number: 14, mass: 28.09, category: 'metalloid', group: 14, period: 3, electronegativity: 1.9, electron_config: '[Ne]3s23p2' },
  { symbol: 'P', name: 'Phosphorus', name_tr: 'Fosfor', number: 15, mass: 30.97, category: 'nonmetal', group: 15, period: 3, electronegativity: 2.19, electron_config: '[Ne]3s23p3' },
  { symbol: 'S', name: 'Sulfur', name_tr: 'Kükürt', number: 16, mass: 32.07, category: 'nonmetal', group: 16, period: 3, electronegativity: 2.58, electron_config: '[Ne]3s23p4' },
  { symbol: 'Cl', name: 'Chlorine', name_tr: 'Klor', number: 17, mass: 35.45, category: 'nonmetal', group: 17, period: 3, electronegativity: 3.16, electron_config: '[Ne]3s23p5' },
  { symbol: 'Ar', name: 'Argon', name_tr: 'Argon', number: 18, mass: 39.95, category: 'noble', group: 18, period: 3, electron_config: '[Ne]3s23p6' },
  { symbol: 'K', name: 'Potassium', name_tr: 'Potasyum', number: 19, mass: 39.10, category: 'metal', group: 1, period: 4, electronegativity: 0.82, electron_config: '[Ar]4s1' },
  { symbol: 'Ca', name: 'Calcium', name_tr: 'Kalsiyum', number: 20, mass: 40.08, category: 'metal', group: 2, period: 4, electronegativity: 1.0, electron_config: '[Ar]4s2' },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'metal': return '#3B82F6';
    case 'nonmetal': return '#10B981';
    case 'metalloid': return '#8B5CF6';
    case 'noble': return '#F59E0B';
    default: return colors.surfaceLight;
  }
};

const getElectronegativityColor = (en?: number) => {
  if (!en) return colors.surfaceLight;
  const normalized = (en - 0.7) / 3.3;
  const r = Math.round(255 * normalized);
  const b = Math.round(255 * (1 - normalized));
  return `rgb(${r}, 100, ${b})`;
};

export const PeriodicTableSimulation: React.FC<PeriodicTableProps> = ({ view, highlight }) => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const getElementColor = (elem: Element) => {
    if (highlight !== 'none') {
      const matches = 
        (highlight === 'metals' && elem.category === 'metal') ||
        (highlight === 'nonmetals' && elem.category === 'nonmetal') ||
        (highlight === 'metalloids' && elem.category === 'metalloid');
      if (!matches) return colors.surfaceLight;
    }
    
    switch (view) {
      case 'electronegativity':
        return getElectronegativityColor(elem.electronegativity);
      case 'electron_config':
      default:
        return getCategoryColor(elem.category);
    }
  };

  const getPosition = (elem: Element) => {
    let x = (elem.group - 1) * CELL_SIZE + 10;
    let y = (elem.period - 1) * CELL_SIZE + 10;
    return { x, y };
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
          {/* Period labels */}
          {[1, 2, 3, 4].map(period => (
            <SvgText
              key={`p${period}`}
              x={5}
              y={(period - 1) * CELL_SIZE + 10 + CELL_SIZE / 2 + 4}
              fill={colors.textMuted}
              fontSize={10}
            >
              {period}
            </SvgText>
          ))}
          
          {/* Elements */}
          {ELEMENTS.map(elem => {
            const pos = getPosition(elem);
            const isSelected = selectedElement?.number === elem.number;
            return (
              <G key={elem.number}>
                <Rect
                  x={pos.x}
                  y={pos.y}
                  width={CELL_SIZE - 2}
                  height={CELL_SIZE - 2}
                  fill={getElementColor(elem)}
                  rx={3}
                  stroke={isSelected ? colors.white : 'transparent'}
                  strokeWidth={isSelected ? 2 : 0}
                  onPress={() => setSelectedElement(elem)}
                />
                <SvgText
                  x={pos.x + CELL_SIZE / 2 - 1}
                  y={pos.y + CELL_SIZE / 2 - 2}
                  fill={colors.white}
                  fontSize={CELL_SIZE > 25 ? 12 : 10}
                  fontWeight="bold"
                  textAnchor="middle"
                  onPress={() => setSelectedElement(elem)}
                >
                  {elem.symbol}
                </SvgText>
                <SvgText
                  x={pos.x + CELL_SIZE / 2 - 1}
                  y={pos.y + CELL_SIZE - 6}
                  fill={colors.white}
                  fontSize={7}
                  textAnchor="middle"
                  opacity={0.8}
                >
                  {elem.number}
                </SvgText>
              </G>
            );
          })}
        </Svg>
      </ScrollView>
      
      {/* Selected element info */}
      {selectedElement && (
        <View style={styles.infoPanel}>
          <View style={styles.infoHeader}>
            <View style={[styles.symbolBox, { backgroundColor: getCategoryColor(selectedElement.category) }]}>
              <Text style={styles.symbolText}>{selectedElement.symbol}</Text>
              <Text style={styles.numberText}>{selectedElement.number}</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.nameText}>{selectedElement.name_tr}</Text>
              <Text style={styles.nameEnText}>{selectedElement.name}</Text>
              <Text style={styles.massText}>Kütle: {selectedElement.mass.toFixed(3)}</Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedElement(null)} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoDetails}>
            {selectedElement.electronegativity && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Elektronegatiflik</Text>
                <Text style={styles.detailValue}>{selectedElement.electronegativity}</Text>
              </View>
            )}
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Elektron Dizilimi</Text>
              <Text style={styles.detailValue}>{selectedElement.electron_config}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Kategori</Text>
              <Text style={[styles.detailValue, { color: getCategoryColor(selectedElement.category) }]}>
                {selectedElement.category === 'metal' ? 'Metal' : 
                 selectedElement.category === 'nonmetal' ? 'Ametal' :
                 selectedElement.category === 'metalloid' ? 'Yarımetal' : 'Soy Gaz'}
              </Text>
            </View>
          </View>
        </View>
      )}
      
      {!selectedElement && (
        <Text style={styles.hint}>Elementlere dokunarak detayları görün</Text>
      )}
      
      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
          <Text style={styles.legendText}>Metal</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>Ametal</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#8B5CF6' }]} />
          <Text style={styles.legendText}>Yarımetal</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
          <Text style={styles.legendText}>Soy Gaz</Text>
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
  },
  infoPanel: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  symbolBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  symbolText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
  },
  numberText: {
    fontSize: 10,
    color: colors.white,
    opacity: 0.8,
  },
  infoMain: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  nameEnText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  massText: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  closeBtnText: {
    fontSize: 24,
    color: colors.textMuted,
  },
  infoDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    width: '50%',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 10,
    color: colors.textMuted,
  },
  detailValue: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  hint: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
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
    fontSize: 10,
    color: colors.textMuted,
  },
});
