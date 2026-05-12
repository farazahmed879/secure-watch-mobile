/**
 * Color palette for Secure Watch 24
 * Dark-mode-first design with security/surveillance branding
 */
export const Colors = {
  // Primary palette
  primary: '#0A1628',        // Deep navy background
  primaryLight: '#0F2040',   // Slightly lighter navy
  primaryDark: '#050D17',    // Darker navy

  // Accent palette
  accent: '#00B4D8',         // Electric cyan
  accentLight: '#48CAE4',    // Light cyan
  accentDark: '#0096B7',     // Darker cyan
  accentGlow: 'rgba(0, 180, 216, 0.3)', // Glow effect

  // Secondary accent
  secondary: '#4361EE',      // Electric blue
  secondaryLight: '#738BF5', // Light blue
  secondaryGlow: 'rgba(67, 97, 238, 0.3)',

  // Status colors
  success: '#06D6A0',        // Green
  warning: '#FFD166',        // Yellow
  error: '#EF476F',          // Red

  // Neutral palette
  white: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.45)',
  border: 'rgba(255, 255, 255, 0.1)',
  cardBg: 'rgba(15, 32, 64, 0.6)',
  cardBorder: 'rgba(0, 180, 216, 0.15)',
  overlay: 'rgba(5, 13, 23, 0.85)',

  // Gradient colors
  gradientStart: '#4361EE',
  gradientEnd: '#00B4D8',
  gradientDark: ['#0A1628', '#0F2040'] as const,
} as const;

export type ColorKey = keyof typeof Colors;
