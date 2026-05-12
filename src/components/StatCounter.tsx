/**
 * StatCounter - Animated number counter for impressive stats
 */
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  FadeInUp,
  Easing,
} from 'react-native-reanimated';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

const AnimatedText = Animated.createAnimatedComponent(Text);

const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  label,
  icon,
  delay = 0,
}) => {
  const animatedValue = useSharedValue(0);
  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      animatedValue.value = withTiming(value, {
        duration: 2000,
        easing: Easing.out(Easing.cubic),
      });

      // Simple interval to update displayed value
      let startTime = Date.now();
      const duration = 2000;
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(easedProgress * value));
        if (progress >= 1) {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return (
    <Animated.View
      entering={FadeInUp.delay(delay).duration(600).springify()}
      style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.value}>
        {prefix}
        {displayValue}
        {suffix}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: Spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accentGlow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  value: {
    ...Typography.stat,
    color: Colors.accent,
    marginBottom: Spacing.xs,
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default StatCounter;
