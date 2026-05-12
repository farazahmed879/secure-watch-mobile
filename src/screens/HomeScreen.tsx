/**
 * HomeScreen - Main landing screen showcasing Secure Watch 24 services
 */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Linking,
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
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Header from '../components/Header';
import SectionHeader from '../components/SectionHeader';
import ServiceCard from '../components/ServiceCard';
import StatCounter from '../components/StatCounter';
import TestimonialCard from '../components/TestimonialCard';
import GradientButton from '../components/GradientButton';
import AnimatedCard from '../components/AnimatedCard';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: <Icon name="cctv" size={26} color={Colors.accent} />,
    title: '24/7 Live Monitoring',
    description:
      'Continuous real-time surveillance by our expert security team',
  },
  {
    icon: <Icon name="remote-desktop" size={26} color={Colors.accent} />,
    title: 'Remote Management',
    description:
      'Comprehensive remote surveillance and security asset management',
  },
  {
    icon: <Icon name="file-search-outline" size={26} color={Colors.accent} />,
    title: 'Incident Detection',
    description:
      'Proactive detection and detailed reporting of security incidents',
  },
  {
    icon: <Icon name="alarm-light" size={26} color={Colors.accent} />,
    title: 'Real-Time Alerts',
    description: 'Instant notification and emergency response coordination',
  },
  {
    icon: <Icon name="account-group" size={26} color={Colors.accent} />,
    title: 'Guard Coordination',
    description:
      'Seamless support and coordination with on-site security personnel',
  },
  {
    icon: <Icon name="timetable" size={26} color={Colors.accent} />,
    title: 'Routine Reporting',
    description:
      'Reports every 30 minutes or customized as per your specific needs',
  },
];

const TESTIMONIALS = [
  {
    name: 'Robert Chen',
    company: 'TechFlow Inc., USA',
    quote:
      'Secure Watch transformed our security operations. Their monitoring team caught an intrusion attempt at 3 AM and alerted us instantly.',
    rating: 5,
  },
  {
    name: 'Sarah Mitchell',
    company: 'MapleLeaf Properties, Canada',
    quote:
      'Exceptional service! The remote access feature lets me check all 12 of our properties from my phone. Highly recommended.',
    rating: 5,
  },
  {
    name: 'Ahmed Al-Rashid',
    company: 'Gulf Trading Co., UAE',
    quote:
      'Professional, reliable, and cost-effective. They handle our surveillance across 3 countries seamlessly.',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    company: 'SecureRetail Group, UK',
    quote:
      'Since switching to Secure Watch, our shrinkage has dropped by 65%. The AI analytics feature is game-changing.',
    rating: 4,
  },
];

const INDUSTRIES = [
  { name: 'Residential', icon: 'home-city-outline' },
  { name: 'Commercial', icon: 'office-building-outline' },
  { name: 'Retail Stores', icon: 'store-outline' },
  { name: 'Warehouses', icon: 'warehouse' },
  { name: 'Construction', icon: 'crane' },
  { name: 'Corporate', icon: 'briefcase-variant-outline' },
];

// ─── Component ───────────────────────────────────────────────────────────────

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryDark]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Header />

        {/* ── Hero Section ── */}
        <View style={styles.heroSection}>
          <Animated.View
            entering={FadeIn.delay(200).duration(800)}
            style={styles.heroIconContainer}
          >
            <LinearGradient
              colors={[Colors.accentGlow, 'transparent']}
              style={styles.heroGlow}
            >
              <View style={styles.heroShield}>
                <Image
                  source={require('../assets/images/logo.png')}
                  style={styles.heroLogo}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
          </Animated.View>

          <Animated.Text
            entering={FadeInDown.delay(400).duration(600)}
            style={styles.heroTitle}
          >
            Securing Your World{'\n'}
            <Text style={styles.heroAccent}>24 Hours a Day</Text>
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(600).duration(600)}
            style={styles.heroSubtitle}
          >
            Secure Watch is a professional security monitoring company
            specializing in 24/7 CCTV surveillance and remote security
            management. We deliver reliable, real-time monitoring solutions
            designed to protect properties, assets, and people with maximum
            efficiency and vigilance.
          </Animated.Text>

          <Animated.View entering={FadeInUp.delay(800).duration(600)}>
            <GradientButton
              title="Get Protected Today"
              onPress={() => navigation.navigate('Contact')}
              icon={<Icon name="shield-check" size={20} color={Colors.white} />}
            />
          </Animated.View>
        </View>

        {/* ── Trusted By Badge ── */}
        <AnimatedCard delay={900} style={styles.trustedCard}>
          <View style={styles.trustedRow}>
            <Icon name="check-decagram" size={20} color={Colors.success} />
            <Text style={styles.trustedText}>
              Trusted by 10+ businesses worldwide
            </Text>
          </View>
          <View style={styles.flagsRow}>
            <Text style={styles.flag}>🇺🇸</Text>
            <Text style={styles.flag}>🇨🇦</Text>
            <Text style={styles.flag}>🇬🇧</Text>
            <Text style={styles.flag}>🇦🇪</Text>
            <Text style={styles.flag}>🇦🇺</Text>
            <Text style={styles.flag}>🇮🇳</Text>
            <Text style={styles.flagMore}>+9</Text>
          </View>
        </AnimatedCard>

        {/* ── Services Section ── */}
        <View style={styles.section}>
          <SectionHeader
            title="Our Services"
            subtitle="Comprehensive surveillance solutions for every need"
            delay={200}
          />
          <View style={styles.servicesGrid}>
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={300 + index * 100}
              />
            ))}
          </View>
        </View>

        {/* ── How We Work Section ── */}
        <View style={styles.section}>
          <SectionHeader
            title="How We Work"
            subtitle="Our proactive process for maximum protection"
            delay={100}
          />
          <AnimatedCard delay={200}>
            <Text style={styles.howItWorksIntro}>
              Our highly trained monitoring officers continuously observe live
              CCTV feeds to ensure complete situational awareness.
            </Text>

            <View style={styles.howItWorksSteps}>
              <View style={styles.howItWorksStep}>
                <View style={styles.stepIconContainer}>
                  <Icon
                    name="account-tie-voice"
                    size={22}
                    color={Colors.accent}
                  />
                </View>
                <Text style={styles.howItWorksStepText}>
                  Notifying on-ground security personnel
                </Text>
              </View>

              <View style={styles.howItWorksStep}>
                <View style={styles.stepIconContainer}>
                  <Icon
                    name="office-building"
                    size={22}
                    color={Colors.accent}
                  />
                </View>
                <Text style={styles.howItWorksStepText}>
                  Informing property management in real-time
                </Text>
              </View>

              <View style={styles.howItWorksStep}>
                <View style={styles.stepIconContainer}>
                  <Icon name="alert-decagram" size={22} color={Colors.accent} />
                </View>
                <Text style={styles.howItWorksStepText}>
                  Escalating emergencies to authorities when required
                </Text>
              </View>
            </View>

            <View style={styles.howItWorksFooter}>
              <Icon
                name="shield-check-outline"
                size={20}
                color={Colors.success}
              />
              <Text style={styles.howItWorksFooterText}>
                Structured communication through regular updates, ensuring
                transparency and accountability.
              </Text>
            </View>
          </AnimatedCard>
        </View>

        {/* ── Stats Section ── */}
        <View style={styles.section}>
          <SectionHeader
            title="By The Numbers"
            subtitle="Our track record speaks for itself"
            delay={100}
          />
          <View style={styles.statsRow}>
            <StatCounter
              value={10}
              suffix="+"
              label="Happy Clients"
              icon={
                <Icon name="account-group" size={22} color={Colors.accent} />
              }
              delay={200}
            />
            <StatCounter
              value={24}
              suffix="/7"
              label="Monitoring"
              icon={
                <Icon name="clock-outline" size={22} color={Colors.accent} />
              }
              delay={350}
            />
          </View>
          <View style={styles.statsRow}>
            <StatCounter
              value={15}
              suffix="+"
              label="Countries"
              icon={<Icon name="earth" size={22} color={Colors.accent} />}
              delay={500}
            />
            <StatCounter
              value={99}
              suffix=".9%"
              label="Uptime"
              icon={
                <Icon name="check-circle" size={22} color={Colors.accent} />
              }
              delay={650}
            />
          </View>
        </View>

        {/* ── Key Features Section ── */}
        <View style={styles.section}>
          <SectionHeader
            title="Key Features"
            subtitle="What sets Secure Watch apart from the rest"
            delay={100}
          />
          <AnimatedCard delay={200}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconBox}>
                <Icon
                  name="account-tie-voice"
                  size={20}
                  color={Colors.accent}
                />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>
                  Professional Monitoring Team
                </Text>
                <Text style={styles.featureDesc}>
                  Our expert security personnel are trained for high-vigilance
                  monitoring
                </Text>
              </View>
            </View>
          </AnimatedCard>

          <AnimatedCard delay={300}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconBox}>
                <Icon name="clock-fast" size={20} color={Colors.accent} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Rapid Response Time</Text>
                <Text style={styles.featureDesc}>
                  Instant detection and immediate action to mitigate security
                  risks
                </Text>
              </View>
            </View>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconBox}>
                <Icon
                  name="file-document-edit-outline"
                  size={20}
                  color={Colors.accent}
                />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>
                  Accurate Incident Reporting
                </Text>
                <Text style={styles.featureDesc}>
                  Meticulous and detailed reports of every detected security
                  event
                </Text>
              </View>
            </View>
          </AnimatedCard>

          <AnimatedCard delay={500}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconBox}>
                <Icon name="tune" size={20} color={Colors.accent} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>
                  Customizable Monitoring Plans
                </Text>
                <Text style={styles.featureDesc}>
                  Security solutions tailored specifically to your project
                  requirements
                </Text>
              </View>
            </View>
          </AnimatedCard>

          <AnimatedCard delay={600}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconBox}>
                <Icon name="earth" size={20} color={Colors.accent} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>
                  Global Remote Capability
                </Text>
                <Text style={styles.featureDesc}>
                  Professional surveillance management across borders and time
                  zones
                </Text>
              </View>
            </View>
          </AnimatedCard>

          <AnimatedCard delay={700}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconBox}>
                <Icon name="currency-usd-off" size={20} color={Colors.accent} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>
                  Cost-Effective Solutions
                </Text>
                <Text style={styles.featureDesc}>
                  Save up to 70% compared to traditional on-ground security
                  personnel
                </Text>
              </View>
            </View>
          </AnimatedCard>
        </View>

        {/* ── Industries Section ── */}
        <View style={styles.section}>
          <SectionHeader
            title="Industries We Serve"
            subtitle="Tailored security solutions for diverse sectors"
            delay={100}
          />
          <View style={styles.industriesGrid}>
            {INDUSTRIES.map((industry, index) => (
              <AnimatedCard
                key={industry.name}
                delay={200 + index * 100}
                style={styles.industryCard}
              >
                <Icon name={industry.icon} size={32} color={Colors.accent} />
                <Text style={styles.industryName}>{industry.name}</Text>
              </AnimatedCard>
            ))}
          </View>
        </View>

        {/* ── Why Choose Us Section ── */}
        <View style={styles.section}>
          <SectionHeader
            title="Why Choose Secure Watch"
            subtitle="The benefits of partnering with the industry leaders"
            delay={100}
          />
          <View style={styles.benefitsContainer}>
            <AnimatedCard delay={200} style={styles.benefitCard}>
              <Icon
                name="clock-check-outline"
                size={24}
                color={Colors.accent}
              />
              <View style={styles.benefitTextContent}>
                <Text style={styles.benefitTitle}>
                  24/7 Dedicated Monitoring
                </Text>
                <Text style={styles.benefitDesc}>
                  Uninterrupted vigilance by professional security officers
                </Text>
              </View>
            </AnimatedCard>

            <AnimatedCard delay={300} style={styles.benefitCard}>
              <Icon
                name="shield-lock-outline"
                size={24}
                color={Colors.accent}
              />
              <View style={styles.benefitTextContent}>
                <Text style={styles.benefitTitle}>Reduced Risk & Loss</Text>
                <Text style={styles.benefitDesc}>
                  Significantly lower risk of theft, vandalism, and incidents
                </Text>
              </View>
            </AnimatedCard>

            <AnimatedCard delay={400} style={styles.benefitCard}>
              <Icon
                name="bullhorn-variant-outline"
                size={24}
                color={Colors.accent}
              />
              <View style={styles.benefitTextContent}>
                <Text style={styles.benefitTitle}>Professional Reporting</Text>
                <Text style={styles.benefitDesc}>
                  Structured communication and transparent accountability
                </Text>
              </View>
            </AnimatedCard>

            <AnimatedCard delay={500} style={styles.benefitCard}>
              <Icon name="arrow-expand-all" size={24} color={Colors.accent} />
              <View style={styles.benefitTextContent}>
                <Text style={styles.benefitTitle}>Scalable Solutions</Text>
                <Text style={styles.benefitDesc}>
                  Security that grows with your business, from SMBs to
                  Enterprises
                </Text>
              </View>
            </AnimatedCard>

            <AnimatedCard delay={600} style={styles.benefitCard}>
              <Icon name="earth" size={24} color={Colors.accent} />
              <View style={styles.benefitTextContent}>
                <Text style={styles.benefitTitle}>
                  International Capability
                </Text>
                <Text style={styles.benefitDesc}>
                  Seamless global service across multiple countries and regions
                </Text>
              </View>
            </AnimatedCard>
          </View>
        </View>

        {/* ── International Collaboration Section ── */}
        <View style={styles.section}>
          <SectionHeader
            title="International Collaboration"
            subtitle="Strengthening security through global partnership"
            delay={100}
          />
          <AnimatedCard delay={200} style={styles.collaborationCard}>
            <View style={styles.collabHeader}>
              <View style={styles.collabIconBox}>
                <Icon name="handshake" size={24} color={Colors.accent} />
              </View>
              <Text style={styles.collabText}>
                Secure Watch is proudly linked with an established security
                company in Houston, USA —{' '}
                <Text style={styles.partnerNameHighlight}>
                  Alpha Crime Control
                </Text>
                .
              </Text>
            </View>

            <Text style={styles.collabDescription}>
              This collaboration strengthens our operational standards,
              monitoring practices, and service reliability by aligning with
              international security protocols.
            </Text>

            <View style={styles.partnerDetailsBox}>
              <View style={styles.partnerHeader}>
                <Text style={styles.flagIcon}>🇺🇸</Text>
                <Text style={styles.partnerTitle}>Alpha Crime Control</Text>
              </View>

              <View style={styles.partnerInfoRow}>
                <Icon
                  name="map-marker-radius"
                  size={16}
                  color={Colors.accent}
                />
                <Text style={styles.partnerInfoText}>
                  7447 Harwin Drive, Houston, TX, USA
                </Text>
              </View>

              <View style={styles.partnerInfoRow}>
                <Icon name="phone-outline" size={16} color={Colors.accent} />
                <Text style={styles.partnerInfoText}>+1 (281) 702-9418</Text>
              </View>
            </View>
          </AnimatedCard>
        </View>

        {/* ── Testimonials Section ── */}
        {/* <View style={styles.section}>
          <SectionHeader
            title="Client Stories"
            subtitle="What our clients say about us"
            delay={100}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.testimonialScroll}>
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                {...testimonial}
                delay={200 + index * 150}
              />
            ))}
          </ScrollView>
        </View> */}

        {/* ── Pricing Section ── */}
        <View style={styles.section}>
          <SectionHeader
            title="Pricing (Starting From)"
            subtitle="Transparent plans for your security needs"
            delay={100}
          />
          <View style={styles.pricingContainer}>
            <AnimatedCard delay={200} style={styles.pricingCard}>
              <View style={styles.pricingHeader}>
                <Icon name="cctv" size={24} color={Colors.accent} />
                <Text style={styles.pricingTier}>1–4 Cameras</Text>
              </View>
              <View style={styles.priceBox}>
                <Text style={styles.currency}>$</Text>
                <Text style={styles.price}>300</Text>
                <Text style={styles.period}>/ month</Text>
              </View>
            </AnimatedCard>

            <AnimatedCard delay={300} style={styles.pricingCard}>
              <View style={styles.pricingHeader}>
                <View style={styles.multiIcon}>
                  <Icon name="cctv" size={20} color={Colors.accent} />
                  <Icon name="plus" size={14} color={Colors.accent} />
                </View>
                <Text style={styles.pricingTier}>5–10 Cameras</Text>
              </View>
              <View style={styles.priceBox}>
                <Text style={styles.currency}>$</Text>
                <Text style={styles.price}>500</Text>
                <Text style={styles.period}>/ month</Text>
              </View>
            </AnimatedCard>

            <AnimatedCard
              delay={400}
              style={[styles.pricingCard, styles.customPricingCard]}
            >
              <View style={styles.pricingHeader}>
                <Icon name="domain" size={24} color={Colors.accent} />
                <Text style={styles.pricingTier}>Custom Packages</Text>
              </View>
              <Text style={styles.customPriceText}>
                Available based on your requirements
              </Text>
              <TouchableOpacity
                style={styles.contactLink}
                onPress={() => navigation.navigate('Contact')}
              >
                <Text style={styles.contactLinkText}>Get a Quote</Text>
                <Icon name="arrow-right" size={14} color={Colors.accent} />
              </TouchableOpacity>
            </AnimatedCard>
          </View>
          <Text style={styles.pricingDisclaimer}>
            * Final pricing may vary depending on the exact number of cameras
            and scope of monitoring services.
          </Text>
        </View>

        {/* ── Our Commitment Section ── */}
        <View style={styles.section}>
          <SectionHeader
            title="Our Commitment"
            subtitle="Our mission and dedication to your safety"
            delay={100}
          />
          <AnimatedCard delay={200} style={styles.commitmentCard}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.commitmentLogo}
              resizeMode="contain"
            />
            <Text style={styles.commitmentText}>
              At <Text style={styles.brandHighlight}>Secure Watch 24</Text>, our
              mission is to provide dependable and proactive security monitoring
              services that ensure our clients feel safe and secure at all
              times.
            </Text>
          </AnimatedCard>
        </View>

        <AnimatedCard delay={200} style={styles.ctaCard}>
          <LinearGradient
            colors={['rgba(67, 97, 238, 0.2)', 'rgba(0, 180, 216, 0.2)']}
            style={styles.ctaGradient}
          >
            <Icon name="shield-star" size={40} color={Colors.accent} />
            <Text style={styles.ctaTitle}>Ready to Secure Your Business?</Text>
            <Text style={styles.ctaSubtitle}>
              Get a free consultation and custom security plan for your
              premises.
            </Text>
            <GradientButton
              title="Contact Us Now"
              onPress={() => navigation.navigate('Contact')}
              icon={<Icon name="phone" size={18} color={Colors.white} />}
            />
          </LinearGradient>
        </AnimatedCard>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <View style={styles.footerLogo}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.footerLogoImage}
              resizeMode="contain"
            />
            <Text style={styles.footerLogoText}>SECURE WATCH 24</Text>
          </View>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Secure Watch. All rights reserved.
          </Text>
          <Text style={styles.footerTagline}>Security That Never Sleeps</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },

  // Hero
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  heroIconContainer: {
    marginBottom: Spacing.lg,
  },
  heroGlow: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroShield: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroLogo: {
    width: 80,
    height: 80,
  },
  heroTitle: {
    ...Typography.hero,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  heroAccent: {
    color: Colors.accent,
  },
  heroSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },

  // Trusted
  trustedCard: {
    marginHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  trustedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  trustedText: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  flagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  flag: {
    fontSize: 22,
  },
  flagMore: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: '800',
  },

  // Commitment
  commitmentCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: 'rgba(67, 97, 238, 0.05)',
  },
  commitmentLogo: {
    width: 60,
    height: 60,
    marginBottom: Spacing.md,
  },
  commitmentText: {
    ...Typography.body,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 26,
    fontSize: 16,
  },
  brandHighlight: {
    color: Colors.accent,
    fontWeight: '700',
  },

  // Sections
  section: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // Pricing
  pricingContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  pricingCard: {
    padding: Spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  customPricingCard: {
    backgroundColor: 'rgba(67, 97, 238, 0.08)',
    borderColor: Colors.accentGlow,
  },
  pricingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  multiIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pricingTier: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    ...Typography.h3,
    color: Colors.accent,
    fontSize: 20,
    marginRight: 2,
  },
  price: {
    ...Typography.hero,
    color: Colors.textPrimary,
    fontSize: 36,
  },
  period: {
    ...Typography.bodySmall,
    color: Colors.textMuted,
    marginLeft: Spacing.xs,
  },
  customPriceText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  contactLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  contactLinkText: {
    ...Typography.bodySmall,
    color: Colors.accent,
    fontWeight: '700',
  },
  pricingDisclaimer: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: Spacing.lg,
  },

  // Collaboration
  collaborationCard: {
    padding: Spacing.xl,
  },
  collabHeader: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  collabIconBox: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.accentGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collabText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
    lineHeight: 22,
  },
  partnerNameHighlight: {
    color: Colors.accent,
    fontWeight: '800',
  },
  collabDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  partnerDetailsBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  partnerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  flagIcon: {
    fontSize: 20,
  },
  partnerTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  partnerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  partnerInfoText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 13,
  },

  // Why Choose Us
  benefitsContainer: {
    gap: Spacing.md,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    backgroundColor: 'rgba(67, 97, 238, 0.05)',
    borderColor: 'rgba(67, 97, 238, 0.1)',
  },
  benefitTextContent: {
    flex: 1,
  },
  benefitTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 15,
  },
  benefitDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  // Industries
  industriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  industryCard: {
    width: (width - Spacing.lg * 2 - Spacing.md) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  industryName: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    fontWeight: '700',
    textAlign: 'center',
  },

  // How It Works
  howItWorksIntro: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
    lineHeight: 22,
  },
  howItWorksSteps: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  howItWorksStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  stepIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accentGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  howItWorksStepText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    flex: 1,
    fontWeight: '500',
  },
  howItWorksFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  howItWorksFooterText: {
    ...Typography.caption,
    color: Colors.textMuted,
    flex: 1,
    fontStyle: 'italic',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.md,
  },

  // Features
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  featureIconBox: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.accentGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontSize: 16,
    marginBottom: 2,
  },
  featureDesc: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },

  // Testimonials
  testimonialScroll: {
    paddingRight: Spacing.lg,
  },

  // CTA
  ctaCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xxl,
    padding: 0,
    overflow: 'hidden',
  },
  ctaGradient: {
    padding: Spacing.xl,
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
  },
  ctaTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  ctaSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  footerLogoImage: {
    width: 24,
    height: 24,
  },
  footerLogoText: {
    ...Typography.label,
    color: Colors.accent,
    fontSize: 12,
  },
  footerText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  footerTagline: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
});

export default HomeScreen;
