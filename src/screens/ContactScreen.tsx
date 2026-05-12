/**
 * ContactScreen - Contact form with Google Sheets integration
 */
import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import GradientButton from '../components/GradientButton';
import AnimatedCard from '../components/AnimatedCard';
import {
  ContactFormData,
  submitContactForm,
  validateContactForm,
} from '../services/contactService';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

// ─── Constants ───────────────────────────────────────────────────────────────

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'United Arab Emirates',
  'Australia',
  'India',
  'Germany',
  'Other',
];

const CONTACT_INFO = [
  { icon: 'email-outline', label: 'Email', value: 'securewatch24services@gmail.com' },
  { icon: 'phone-outline', label: 'Phone / WhatsApp', value: '+92 309 8344704' },
  { icon: 'earth', label: 'Website', value: 'www.sw24services.com' },
];

// ─── Component ───────────────────────────────────────────────────────────────

const ContactScreen: React.FC = () => {
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);

  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const result = await submitContactForm(formData as ContactFormData);
    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      Alert.alert('Error', result.message);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      country: '',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
    setSelectedCountry(null);
  };

  // ─── Success State ──────────────────────────────────────────────────

  if (submitted) {
    return (
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
        <Header
          showBack
          onBack={() => navigation.goBack()}
          title="CONTACT US"
        />
        <View style={styles.successContainer}>
          <Animated.View
            entering={FadeIn.duration(600)}
            style={styles.successIcon}>
            <LinearGradient
              colors={[Colors.accentGlow, 'transparent']}
              style={styles.successGlow}>
              <View style={styles.successCircle}>
                <Image 
                  source={require('../assets/images/logo.png')} 
                  style={styles.successLogo}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
          </Animated.View>
          <Animated.Text
            entering={FadeInDown.delay(200).duration(500)}
            style={styles.successTitle}>
            Message Sent!
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(400).duration(500)}
            style={styles.successSubtitle}>
            Thank you for reaching out. Our team will get back to you within 24 hours.
          </Animated.Text>
          <Animated.View entering={FadeInUp.delay(600).duration(500)}>
            <GradientButton
              title="Send Another Message"
              onPress={handleReset}
              icon={<Icon name="email-plus" size={18} color={Colors.white} />}
            />
          </Animated.View>
        </View>
      </LinearGradient>
    );
  }

  // ─── Form State ─────────────────────────────────────────────────────

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryDark]}
      style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title="CONTACT US"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">

          {/* ── Contact Info Cards ── */}
          <Animated.Text
            entering={FadeInDown.delay(100).duration(500)}
            style={styles.pageTitle}>
            Get In Touch
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(200).duration(500)}
            style={styles.pageSubtitle}>
            We'd love to hear from you. Fill out the form below and our team will reach out within 24 hours.
          </Animated.Text>

          <View style={styles.contactCards}>
            {CONTACT_INFO.map((info, index) => (
              <AnimatedCard
                key={info.label}
                delay={300 + index * 100}
                style={styles.contactInfoCard}>
                <View style={styles.contactInfoRow}>
                  <View style={styles.contactInfoIcon}>
                    <Icon name={info.icon} size={20} color={Colors.accent} />
                  </View>
                  <View style={styles.contactInfoText}>
                    <Text style={styles.contactInfoLabel}>{info.label}</Text>
                    <Text style={styles.contactInfoValue} numberOfLines={1} ellipsizeMode="middle">{info.value}</Text>
                  </View>
                </View>
              </AnimatedCard>
            ))}
          </View>

          {/* ── Form ── */}
          <AnimatedCard delay={600} style={styles.formCard}>
            <Text style={styles.formTitle}>Send Us a Message</Text>

            {/* Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Full Name *</Text>
              <View
                style={[
                  styles.inputContainer,
                  errors.name && styles.inputError,
                ]}>
                <Icon name="account-outline" size={18} color={Colors.textMuted} />
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor={Colors.textMuted}
                  value={formData.name}
                  onChangeText={v => updateField('name', v)}
                  autoCapitalize="words"
                />
              </View>
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email Address *</Text>
              <View
                style={[
                  styles.inputContainer,
                  errors.email && styles.inputError,
                ]}>
                <Icon name="email-outline" size={18} color={Colors.textMuted} />
                <TextInput
                  style={styles.input}
                  placeholder="john@company.com"
                  placeholderTextColor={Colors.textMuted}
                  value={formData.email}
                  onChangeText={v => updateField('email', v)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Phone */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Phone Number *</Text>
              <View
                style={[
                  styles.inputContainer,
                  errors.phone && styles.inputError,
                ]}>
                <Icon name="phone-outline" size={18} color={Colors.textMuted} />
                <TextInput
                  style={styles.input}
                  placeholder="+1 (555) 000-0000"
                  placeholderTextColor={Colors.textMuted}
                  value={formData.phone}
                  onChangeText={v => updateField('phone', v)}
                  keyboardType="phone-pad"
                />
              </View>
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            {/* Company */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Company Name</Text>
              <View style={styles.inputContainer}>
                <Icon name="office-building-outline" size={18} color={Colors.textMuted} />
                <TextInput
                  style={styles.input}
                  placeholder="Your Company Inc."
                  placeholderTextColor={Colors.textMuted}
                  value={formData.company}
                  onChangeText={v => updateField('company', v)}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Country Picker */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Country</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowCountryPicker(!showCountryPicker)}>
                <Icon name="earth" size={18} color={Colors.textMuted} />
                <Text
                  style={[
                    styles.pickerText,
                    !selectedCountry && styles.placeholderText,
                  ]}>
                  {selectedCountry || 'Select your country'}
                </Text>
                <Icon
                  name={showCountryPicker ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={Colors.textMuted}
                />
              </TouchableOpacity>
              {showCountryPicker && (
                <Animated.View
                  entering={FadeInDown.duration(200)}
                  style={styles.countryList}>
                  {COUNTRIES.map(country => (
                    <TouchableOpacity
                      key={country}
                      style={[
                        styles.countryItem,
                        selectedCountry === country && styles.countryItemActive,
                      ]}
                      onPress={() => {
                        setSelectedCountry(country);
                        updateField('country', country);
                        setShowCountryPicker(false);
                      }}>
                      <Text
                        style={[
                          styles.countryItemText,
                          selectedCountry === country &&
                            styles.countryItemTextActive,
                        ]}>
                        {country}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </Animated.View>
              )}
            </View>

            {/* Message */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Message *</Text>
              <View
                style={[
                  styles.inputContainer,
                  styles.messageInput,
                  errors.message && styles.inputError,
                ]}>
                <TextInput
                  style={[styles.input, styles.messageField]}
                  placeholder="Tell us about your security needs..."
                  placeholderTextColor={Colors.textMuted}
                  value={formData.message}
                  onChangeText={v => updateField('message', v)}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                />
              </View>
              {errors.message && (
                <Text style={styles.errorText}>{errors.message}</Text>
              )}
            </View>

            {/* Submit */}
            <View style={styles.submitSection}>
              <GradientButton
                title="Send Message"
                onPress={handleSubmit}
                loading={loading}
                icon={
                  <Icon name="send" size={18} color={Colors.white} />
                }
              />
              <Text style={styles.privacyText}>
                🔒 Your information is safe with us. We never share your data.
              </Text>
            </View>
          </AnimatedCard>

          {/* ── Quick Actions ── */}
          <AnimatedCard delay={700} style={styles.quickActions}>
            <Text style={styles.quickActionsTitle}>Prefer a direct call?</Text>
            <View style={styles.quickActionsRow}>
              <TouchableOpacity
                style={styles.quickActionBtn}
                onPress={() => Linking.openURL('tel:+923098344704')}>
                <Icon name="phone" size={22} color={Colors.accent} />
                <Text style={styles.quickActionText}>Call Us</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickActionBtn}
                onPress={() => Linking.openURL('mailto:securewatch24services@gmail.com')}>
                <Icon name="email" size={22} color={Colors.accent} />
                <Text style={styles.quickActionText}>Email Us</Text>
              </TouchableOpacity>
            </View>
          </AnimatedCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },

  // Page Header
  pageTitle: {
    ...Typography.h1,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  pageSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },

  // Contact Info
  contactCards: {},
  contactInfoCard: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  contactInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  contactInfoIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accentGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfoText: {
    flex: 1,
  },
  contactInfoLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactInfoValue: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },

  // Form
  formCard: {
    marginTop: Spacing.md,
  },
  formTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  fieldGroup: {
    marginBottom: Spacing.md,
  },
  fieldLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  inputError: {
    borderColor: Colors.error,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    paddingVertical: Spacing.xs,
  },
  messageInput: {
    alignItems: 'flex-start',
    minHeight: 120,
  },
  messageField: {
    minHeight: 100,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: Spacing.xs,
  },

  // Picker
  pickerText: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    paddingVertical: Spacing.xs,
  },
  placeholderText: {
    color: Colors.textMuted,
  },
  countryList: {
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.xs,
    overflow: 'hidden',
  },
  countryItem: {
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  countryItemActive: {
    backgroundColor: Colors.accentGlow,
  },
  countryItemText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  countryItemTextActive: {
    color: Colors.accent,
    fontWeight: '600',
  },

  // Submit
  submitSection: {
    marginTop: Spacing.md,
    alignItems: 'center',
  },
  privacyText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.md,
    textAlign: 'center',
  },

  // Success
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  successIcon: {
    marginBottom: Spacing.lg,
  },
  successGlow: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primaryLight,
    borderWidth: 2,
    borderColor: 'rgba(67, 97, 238, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  successLogo: {
    width: 70,
    height: 70,
  },
  successTitle: {
    ...Typography.h1,
    color: Colors.success,
    marginBottom: Spacing.sm,
  },
  successSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },

  // Quick Actions
  quickActions: {
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  quickActionsTitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: Spacing.xl,
  },
  quickActionBtn: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  quickActionText: {
    ...Typography.caption,
    color: Colors.accent,
    fontWeight: '600',
  },
});

export default ContactScreen;
