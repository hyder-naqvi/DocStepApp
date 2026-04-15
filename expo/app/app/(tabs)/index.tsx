import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bell,
  ChevronRight,
  Video,
  MapPin,
  Stethoscope,
  Heart,
  Sparkles,
  Baby,
} from "lucide-react-native";
import { useRouter } from "expo-router";

// DocStep - Home Dashboard Screen
import Colors from "@/constants/colors";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { appointments, doctors, medicalSpecialties, userProfile } from "@/constants/mockData";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { colors } = useTheme();
  const upcomingAppointments = appointments.filter((a) => a.status === "upcoming");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>Good morning,</Text>
            <Text style={[styles.userName, { color: colors.text }]}>{user?.name ?? userProfile.name}</Text>
          </View>
          <TouchableOpacity style={[styles.notificationButton, { backgroundColor: colors.backgroundSecondary }]}>
            <Bell size={22} color={colors.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Health Tip Card */}
        <View style={styles.healthTipCard}>
          <View style={styles.healthTipContent}>
            <Text style={styles.healthTipLabel}>Daily Health Tip</Text>
            <Text style={styles.healthTipText}>
              Stay hydrated! Drink at least 8 glasses of water daily for optimal health.
            </Text>
          </View>
          <View style={styles.healthTipIcon}>
            <Stethoscope size={32} color={Colors.light.tint} />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: "#E0F2FE" }]}>
              <Video size={24} color="#0891B2" />
            </View>
            <Text style={styles.quickActionText}>Video Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: "#FCE7F3" }]}>
              <MapPin size={24} color="#EC4899" />
            </View>
            <Text style={styles.quickActionText}>Book Visit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: "#DCFCE7" }]}>
              <Stethoscope size={24} color="#10B981" />
            </View>
            <Text style={styles.quickActionText}>Symptoms</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: "#FEF3C7" }]}>
              <Heart size={24} color="#F59E0B" />
            </View>
            <Text style={styles.quickActionText}>Health</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity onPress={() => router.push("/appointments")}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <Image
                    source={{ uri: appointment.doctorImage }}
                    style={styles.doctorImage}
                  />
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.doctorName}>{appointment.doctorName}</Text>
                    <Text style={styles.specialty}>{appointment.specialty}</Text>
                    <View style={styles.appointmentTime}>
                      <Text style={styles.timeText}>
                        {appointment.date} • {appointment.time}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.typeBadge,
                      appointment.type === "video" && styles.videoBadge,
                      appointment.type === "in-person" && styles.inPersonBadge,
                    ]}
                  >
                    {appointment.type === "video" ? (
                      <Video size={12} color="#0891B2" />
                    ) : (
                      <MapPin size={12} color="#10B981" />
                    )}
                    <Text
                      style={[
                        styles.typeText,
                        appointment.type === "video" && styles.videoText,
                        appointment.type === "in-person" && styles.inPersonText,
                      ]}
                    >
                      {appointment.type === "video" ? "Video" : "In-person"}
                    </Text>
                  </View>
                </View>
                <View style={styles.appointmentActions}>
                  <TouchableOpacity style={styles.rescheduleButton}>
                    <Text style={styles.rescheduleText}>Reschedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinText}>
                      {appointment.type === "video" ? "Join Call" : "Directions"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No upcoming appointments</Text>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => router.push("/doctors")}
              >
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Find by Specialty */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Find by Specialty</Text>
            <TouchableOpacity onPress={() => router.push("/doctors")}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.specialtyScroll}
          >
            {medicalSpecialties.slice(0, 6).map((specialty, index) => (
              <Pressable
                key={index}
                style={styles.specialtyCard}
                onPress={() => router.push("/doctors")}
              >
                <View
                  style={[
                    styles.specialtyIcon,
                    { backgroundColor: `${specialty.color}15` },
                  ]}
                >
                  {getSpecialtyIcon(specialty.icon, specialty.color)}
                </View>
                <Text style={styles.specialtyName}>{specialty.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Top Rated Doctors */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Rated Doctors</Text>
            <TouchableOpacity onPress={() => router.push("/doctors")}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {doctors.slice(0, 3).map((doctor) => (
            <TouchableOpacity key={doctor.id} style={styles.doctorCard} onPress={() => router.push(`/doctor/${doctor.id}`)}>
              <Image source={{ uri: doctor.image }} style={styles.doctorCardImage} />
              <View style={styles.doctorCardInfo}>
                <Text style={styles.doctorCardName}>{doctor.name}</Text>
                <Text style={styles.doctorCardSpecialty}>{doctor.specialty}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>⭐ {doctor.rating}</Text>
                  <Text style={styles.reviewsText}>({doctor.reviews})</Text>
                </View>
                <View style={styles.availabilityRow}>
                  <View
                    style={[
                      styles.availabilityDot,
                      doctor.availableToday && styles.availableDot,
                    ]}
                  />
                  <Text style={styles.availabilityText}>
                    {doctor.availableToday
                      ? "Available today"
                      : `Next: ${doctor.nextAvailable}`}
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color={Colors.light.textMuted} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getSpecialtyIcon(iconName: string, color: string) {
  switch (iconName) {
    case "Stethoscope":
      return <Stethoscope size={24} color={color} />;
    case "Heart":
      return <Heart size={24} color={color} />;
    case "Sparkles":
      return <Sparkles size={24} color={color} />;
    case "Baby":
      return <Baby size={24} color={color} />;
    default:
      return <Stethoscope size={24} color={color} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.light.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.danger,
  },
  healthTipCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: Colors.light.tint,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  healthTipContent: {
    flex: 1,
  },
  healthTipLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255,255,255,0.8)",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  healthTipText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FFFFFF",
    lineHeight: 22,
  },
  healthTipIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickActionButton: {
    alignItems: "center",
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.light.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.tint,
  },
  appointmentCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  doctorImage: {
    width: 56,
    height: 56,
    borderRadius: 14,
  },
  appointmentInfo: {
    flex: 1,
    marginLeft: 14,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginBottom: 6,
  },
  appointmentTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 13,
    color: Colors.light.tint,
    fontWeight: "500",
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  videoBadge: {
    backgroundColor: "#E0F2FE",
  },
  inPersonBadge: {
    backgroundColor: "#DCFCE7",
  },
  typeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  videoText: {
    color: "#0891B2",
  },
  inPersonText: {
    color: "#10B981",
  },
  appointmentActions: {
    flexDirection: "row",
    gap: 12,
  },
  rescheduleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.light.backgroundSecondary,
    alignItems: "center",
  },
  rescheduleText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
  },
  joinButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
  },
  joinText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  emptyCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 16,
  },
  bookButton: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  specialtyScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  specialtyCard: {
    alignItems: "center",
    marginRight: 16,
  },
  specialtyIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  specialtyName: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.light.text,
    textAlign: "center",
    maxWidth: 80,
  },
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  doctorCardImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  doctorCardInfo: {
    flex: 1,
    marginLeft: 14,
  },
  doctorCardName: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  doctorCardSpecialty: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.light.text,
  },
  reviewsText: {
    fontSize: 12,
    color: Colors.light.textMuted,
    marginLeft: 4,
  },
  availabilityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  availabilityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.light.textMuted,
    marginRight: 6,
  },
  availableDot: {
    backgroundColor: Colors.light.success,
  },
  availabilityText: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
});
