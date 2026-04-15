import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Stethoscope, Calendar, MessageSquare, Shield } from "lucide-react-native";

// DocStep - Welcome/Onboarding Screen
import Colors from "@/constants/colors";
import { useTheme } from "@/contexts/theme-context";

const features = [
  {
    icon: Stethoscope,
    title: "Expert Doctors",
    description: "Connect with verified healthcare professionals across all specialties",
    color: "#0891B2",
  },
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Book appointments instantly with real-time availability",
    color: "#10B981",
  },
  {
    icon: MessageSquare,
    title: "Video Consultations",
    description: "Speak with doctors from the comfort of your home",
    color: "#8B5CF6",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your health data is encrypted and protected",
    color: "#F59E0B",
  },
];

export default function WelcomeScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top", "bottom"]}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/docstep-logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.tagline, { color: colors.text }]}>Healthcare at your fingertips</Text>
        <Text style={[styles.subTagline, { color: colors.textSecondary }]}>
          Book appointments, consult with doctors, and manage your health journey
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View
              style={[
                styles.featureIcon,
                { backgroundColor: `${feature.color}15` },
              ]}
            >
              <feature.icon size={24} color={feature.color} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </TouchableOpacity>
      </View>

      {/* Trust Badges */}
      <View style={styles.trustSection}>
        <Text style={styles.trustText}>Trusted by 10,000+ patients</Text>
        <View style={styles.trustBadges}>
          <View style={styles.badge}>
            <Shield size={14} color={Colors.light.success} />
            <Text style={styles.badgeText}>HIPAA Compliant</Text>
          </View>
          <View style={styles.badge}>
            <Shield size={14} color={Colors.light.success} />
            <Text style={styles.badgeText}>Verified Doctors</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  hero: {
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 32,
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: 260,
    height: 140,
  },
  tagline: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 12,
  },
  subTagline: {
    fontSize: 15,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  featuresContainer: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
  actions: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondaryButton: {
    backgroundColor: Colors.light.backgroundSecondary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.text,
  },
  trustSection: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  trustText: {
    fontSize: 13,
    color: Colors.light.textMuted,
    marginBottom: 12,
  },
  trustBadges: {
    flexDirection: "row",
    gap: 12,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.light.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.light.textSecondary,
  },
});
