/**
 * TestimonialCard - Client testimonial with quote and company info
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

interface TestimonialCardProps {
  name: string;
  company: string;
  quote: string;
  rating: number;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  company,
  quote,
  rating,
  delay = 0,
}) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(delay).duration(500).springify()}
      style={styles.card}>
      <Icon name="format-quote-open" size={24} color={Colors.accent} />
      <Text style={styles.quote}>{quote}</Text>
      <View style={styles.ratingRow}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon
            key={i}
            name={i < rating ? 'star' : 'star-outline'}
            size={16}
            color={Colors.warning}
          />
        ))}
      </View>
      <View style={styles.authorRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name.charAt(0)}</Text>
        </View>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.company}>{company}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: Spacing.lg,
    width: 280,
    marginRight: Spacing.md,
  },
  quote: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginVertical: Spacing.md,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: Spacing.md,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: '700',
  },
  name: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  company: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});

export default TestimonialCard;
