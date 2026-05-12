/**
 * Typography scale for Secure Watch 24
 * Uses system fonts since we're on React Native CLI
 */
import { TextStyle, Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

const fontFamilyBold = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const Typography = {
  hero: {
    fontFamily: fontFamilyBold,
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 44,
    letterSpacing: -0.5,
  } as TextStyle,

  h1: {
    fontFamily: fontFamilyBold,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.3,
  } as TextStyle,

  h2: {
    fontFamily: fontFamilyBold,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
  } as TextStyle,

  h3: {
    fontFamily: fontFamilyBold,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  } as TextStyle,

  body: {
    fontFamily,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  } as TextStyle,

  bodySmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  } as TextStyle,

  caption: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.2,
  } as TextStyle,

  button: {
    fontFamily: fontFamilyBold,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: 0.5,
  } as TextStyle,

  label: {
    fontFamily,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  } as TextStyle,

  stat: {
    fontFamily: fontFamilyBold,
    fontSize: 40,
    fontWeight: '800',
    lineHeight: 48,
  } as TextStyle,
} as const;
