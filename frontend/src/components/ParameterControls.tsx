import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '../utils/colors';

interface ParameterSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export const ParameterSlider: React.FC<ParameterSliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {typeof value === 'number' ? value.toFixed(step < 1 ? 1 : 0) : value} {unit}
        </Text>
      </View>
      <Slider
        style={styles.slider}
        value={value}
        minimumValue={min}
        maximumValue={max}
        step={step}
        onValueChange={onChange}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.surfaceLight}
        thumbTintColor={colors.primary}
      />
      <View style={styles.range}>
        <Text style={styles.rangeText}>{min}{unit}</Text>
        <Text style={styles.rangeText}>{max}{unit}</Text>
      </View>
    </View>
  );
};

interface ParameterSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export const ParameterSelect: React.FC<ParameterSelectProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <View style={styles.selectContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsRow}>
        {options.map((opt) => (
          <Pressable
            key={opt.value}
            style={({ pressed }) => [
              styles.option,
              value === opt.value && styles.optionActive,
              pressed && styles.optionPressed
            ]}
            onPress={() => onChange(opt.value)}
          >
            <Text
              style={[
                styles.optionText,
                value === opt.value && styles.optionTextActive,
              ]}
            >
              {opt.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  range: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
  },
  rangeText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  selectContainer: {
    marginBottom: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  option: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceLight,
    marginRight: 8,
    marginBottom: 8,
    cursor: 'pointer' as any,
  },
  optionActive: {
    backgroundColor: colors.primary,
  },
  optionPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
  optionText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  optionTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
});
