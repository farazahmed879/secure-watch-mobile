/**
 * Header - App header with company name and navigation
 */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography, Spacing } from '../theme';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ showBack, onBack, title }) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(400)}
      style={styles.container}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={Colors.white} />
          </TouchableOpacity>
        )}
        <View style={styles.logoRow}>
          <View style={styles.logoIcon}>
            <Image 
              source={require('../assets/images/logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.logoText}>
              {title || 'SECURE WATCH 24'}
            </Text>
            <Text style={styles.tagline}>Security Services</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: 'transparent',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  backButton: {
    padding: Spacing.sm,
    marginRight: Spacing.xs,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.accentGlow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  logoText: {
    ...Typography.h3,
    color: Colors.accent,
    fontWeight: '800',
    letterSpacing: 1.5,
    fontSize: 15,
  },
  logoImage: {
    width: 30,
    height: 30,
  },
  tagline: {
    ...Typography.caption,
    color: Colors.textMuted,
    letterSpacing: 2,
    fontSize: 9,
  },
});

export default Header;
