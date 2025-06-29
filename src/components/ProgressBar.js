import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const ProgressBar = ({ 
  progress = 0, 
  height = 8, 
  backgroundColor = COLORS.border, 
  fillColor = COLORS.success,
  showPercentage = false,
  style = {},
  animated = false 
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={[styles.container, style]}>
      <View style={[
        styles.progressBar, 
        { 
          height, 
          backgroundColor 
        }
      ]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${clampedProgress}%`,
              backgroundColor: fillColor,
              height,
            },
            animated && styles.animated
          ]}
        />
      </View>
      {showPercentage && (
        <Text style={styles.percentageText}>
          {Math.round(clampedProgress)}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBar: {
    flex: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 4,
  },
  animated: {
    // Could add animation styles here if needed
  },
  percentageText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    minWidth: 35,
    textAlign: 'right',
  },
});

export default ProgressBar;
