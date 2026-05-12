/**
 * SectionHeader - Animated section title with accent underline
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography, Spacing } from '../theme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  delay?: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  delay = 0,
}) => {
  return (
    <Animated.View
      entering={FadeInLeft.delay(delay).duration(500)}
      style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <LinearGradient
        colors={[Colors.accent, Colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.underline}
      />
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  underline: {
    height: 3,
    width: 60,
    borderRadius: 2,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});

export default SectionHeader;
