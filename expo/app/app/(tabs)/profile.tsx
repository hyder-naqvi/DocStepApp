import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronRight,
  FileText,
  Heart,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Settings,
  Edit3,
} from "lucide-react-native";

// DocStep - Profile Screen
import Colors from "@/constants/colors";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { healthStats, userProfile } from "@/constants/mockData";

const menuItems = [
  { icon: FileText, label: "Medical Records", color: "#0891B2" },
  { icon: Heart, label: "Health Metrics", color: "#EF4444" },
  { icon: CreditCard, label: "Payment Methods", color: "#10B981" },
  { icon: Bell, label: "Notifications", color: "#F59E0B" },
  { icon: Shield, label: "Privacy & Security", color: "#8B5CF6" },
  { icon: HelpCircle, label: "Help & Support", color: "#EC4899" },
  { icon: Settings, label: "Settings", color: "#6B7280" },
];

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme, colors } = useTheme();
  const isWeb = Platform.OS === "web";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, isWeb && styles.webContent]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
          <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.backgroundSecondary }]}>
            <Edit3 size={20} color={colors.tint} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: userProfile.avatar }}
              style={styles.avatar}
            />
            <View style={styles.verifiedBadge}>
              <Shield size={12} color="#FFFFFF" />
            </View>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>{user?.name ?? userProfile.name}</Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{user?.email ?? userProfile.email}</Text>
          <Text style={[styles.userPhone, { color: colors.textMuted }]}>{userProfile.phone}</Text>
        </View>

        <View style={[styles.themeCard, { backgroundColor: colors.card }]}>
          <View>
            <Text style={[styles.themeTitle, { color: colors.text }]}>Dark Theme</Text>
            <Text style={[styles.themeSubtitle, { color: colors.textSecondary }]}>
              Use dark mode across app and web
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: `${colors.tint}88` }}
            thumbColor={isDark ? colors.tint : "#f4f3f4"}
          />
        </View>

        {/* Health Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Health Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{healthStats.weight}</Text>
              <Text style={styles.statLabel}>Weight</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{healthStats.height}</Text>
              <Text style={styles.statLabel}>Height</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{healthStats.bmi}</Text>
              <Text style={styles.statLabel}>BMI</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{healthStats.bloodType}</Text>
              <Text style={styles.statLabel}>Blood Type</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStatsSection}>
          <View style={styles.quickStatCard}>
            <View style={[styles.quickStatIcon, { backgroundColor: "#FEE2E2" }]}>
              <Heart size={20} color="#EF4444" />
            </View>
            <View>
              <Text style={styles.quickStatValue}>{healthStats.heartRate}</Text>
              <Text style={styles.quickStatLabel}>Heart Rate</Text>
            </View>
          </View>
          <View style={styles.quickStatCard}>
            <View style={[styles.quickStatIcon, { backgroundColor: "#DBEAFE" }]}>
              <FileText size={20} color="#3B82F6" />
            </View>
            <View>
              <Text style={styles.quickStatValue}>{healthStats.bloodPressure}</Text>
              <Text style={styles.quickStatLabel}>Blood Pressure</Text>
            </View>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <View style={styles.menuCard}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.menuItem, index === menuItems.length - 1 && styles.menuItemLast]}
              >
                <View style={styles.menuItemLeft}>
                  <View
                    style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}
                  >
                    <item.icon size={20} color={item.color} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                <ChevronRight size={20} color={Colors.light.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: isDark ? "#3F1D1D" : "#FEF2F2" }]} onPress={signOut}>
          <LogOut size={20} color={colors.danger} />
          <Text style={[styles.logoutText, { color: colors.danger }]}>Log Out</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.version}>DocStep v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  themeCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  themeSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  webContent: {
    width: "100%",
    maxWidth: 1000,
    alignSelf: "center",
    paddingBottom: 56,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.light.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.light.success,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.light.card,
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: Colors.light.textMuted,
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: "22%",
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.tint,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  quickStatsSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  quickStatCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 12,
  },
  quickStatIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  quickStatValue: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 2,
  },
  quickStatLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  menuSection: {
    marginBottom: 24,
  },
  menuCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.light.text,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FEF2F2",
    borderRadius: 16,
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.danger,
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.light.textMuted,
    marginTop: 20,
  },
});
