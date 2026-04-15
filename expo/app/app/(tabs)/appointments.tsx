import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video, MapPin, ChevronRight, Calendar, Clock } from "lucide-react-native";

// DocStep - Appointments Screen
import Colors from "@/constants/colors";
import { appointments } from "@/constants/mockData";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/theme-context";

type TabType = "upcoming" | "completed" | "cancelled";

export default function AppointmentsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");
  const { colors } = useTheme();
  const isWeb = Platform.OS === "web";
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const filteredAppointments = appointments.filter((a) => a.status === activeTab);

  const tabs: { key: TabType; label: string }[] = [
    { key: "upcoming", label: "Upcoming" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Appointments</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Manage your medical consultations</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, isWeb && styles.webContent]}
      >
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              {/* Date Header */}
              <View style={styles.dateHeader}>
                <View style={styles.dateBox}>
                  <Calendar size={16} color={colors.tint} />
                  <Text style={styles.dateText}>{appointment.date}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    appointment.status === "upcoming" && styles.upcomingBadge,
                    appointment.status === "completed" && styles.completedBadge,
                    appointment.status === "cancelled" && styles.cancelledBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      appointment.status === "upcoming" && styles.upcomingText,
                      appointment.status === "completed" && styles.completedText,
                      appointment.status === "cancelled" && styles.cancelledText,
                    ]}
                  >
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </Text>
                </View>
              </View>

              {/* Doctor Info */}
              <View style={styles.doctorSection}>
                <Image source={{ uri: appointment.doctorImage }} style={styles.doctorImage} />
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{appointment.doctorName}</Text>
                  <Text style={styles.specialty}>{appointment.specialty}</Text>
                  <View style={styles.timeRow}>
                    <Clock size={14} color={colors.textMuted} />
                    <Text style={styles.timeText}>
                      {appointment.time} • {appointment.duration}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Type Badge */}
              <View style={styles.typeSection}>
                <View
                  style={[
                    styles.typeBadge,
                    appointment.type === "video" && styles.videoBadge,
                    appointment.type === "in-person" && styles.inPersonBadge,
                  ]}
                >
                  {appointment.type === "video" ? (
                    <Video size={14} color="#0891B2" />
                  ) : (
                    <MapPin size={14} color="#10B981" />
                  )}
                  <Text
                    style={[
                      styles.typeText,
                      appointment.type === "video" && styles.videoText,
                      appointment.type === "in-person" && styles.inPersonText,
                    ]}
                  >
                    {appointment.type === "video" ? "Video Consultation" : "In-person Visit"}
                  </Text>
                </View>
              </View>

              {/* Actions */}
              {appointment.status === "upcoming" && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Reschedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>
                      {appointment.type === "video" ? "Join Call" : "Get Directions"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {appointment.status === "completed" && (
                <TouchableOpacity style={styles.fullWidthButton}>
                  <Text style={styles.fullWidthButtonText}>View Summary</Text>
                  <ChevronRight size={16} color={colors.tint} />
                </TouchableOpacity>
              )}

              {appointment.status === "cancelled" && (
                <TouchableOpacity style={styles.fullWidthButton}>
                  <Text style={styles.fullWidthButtonText}>Book Again</Text>
                  <ChevronRight size={16} color={colors.tint} />
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Calendar size={48} color={colors.tint} />
            </View>
            <Text style={styles.emptyTitle}>No {activeTab} appointments</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === "upcoming"
                ? "Book a consultation to get started"
                : "Your appointments will appear here"}
            </Text>
            {activeTab === "upcoming" && (
              <TouchableOpacity style={styles.emptyButton} onPress={() => router.push('/doctors')}>
                <Text style={styles.emptyButtonText}>Find a Doctor</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: typeof import("@/constants/colors").default.light) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.backgroundSecondary,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: colors.tint,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  webContent: {
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
    paddingBottom: 48,
  },
  appointmentCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  upcomingBadge: {
    backgroundColor: "#E0F2FE",
  },
  completedBadge: {
    backgroundColor: "#DCFCE7",
  },
  cancelledBadge: {
    backgroundColor: colors.backgroundSecondary,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  upcomingText: {
    color: "#0891B2",
  },
  completedText: {
    color: "#10B981",
  },
  cancelledText: {
    color: colors.textMuted,
  },
  doctorSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 14,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timeText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  typeSection: {
    marginBottom: 16,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 8,
  },
  videoBadge: {
    backgroundColor: "#E0F2FE",
  },
  inPersonBadge: {
    backgroundColor: "#DCFCE7",
  },
  typeText: {
    fontSize: 13,
    fontWeight: "500",
  },
  videoText: {
    color: "#0891B2",
  },
  inPersonText: {
    color: "#10B981",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.backgroundSecondary,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.tint,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  fullWidthButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.backgroundSecondary,
    gap: 8,
  },
  fullWidthButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.tint,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 32,
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: colors.tint,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});