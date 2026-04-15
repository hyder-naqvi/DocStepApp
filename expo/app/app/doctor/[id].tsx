import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeft,
  Star,
  MapPin,
  Clock,
  Languages,
  GraduationCap,
  Building2,
  Calendar,
  Video,
  Heart,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/colors";
import { doctors } from "@/constants/mockData";
import { useTheme } from "@/contexts/theme-context";

export default function DoctorDetailScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const { id } = useLocalSearchParams<{ id: string }>();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Doctor Not Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString("en-PK")}`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Doctor Profile</Text>
          <TouchableOpacity style={styles.favoriteButton}>
            <Heart size={22} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Doctor Card */}
        <View style={styles.doctorCard}>
          <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
            <View style={styles.ratingRow}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>{doctor.rating}</Text>
              <Text style={styles.reviewsText}>({doctor.reviews} reviews)</Text>
            </View>
            <View style={styles.hospitalRow}>
              <Building2 size={14} color={colors.textMuted} />
              <Text style={styles.hospitalText}>{doctor.hospital}</Text>
            </View>
            <View style={styles.cityRow}>
              <MapPin size={14} color={colors.textMuted} />
              <Text style={styles.cityText}>{doctor.city}</Text>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Clock size={20} color={colors.tint} />
            <Text style={styles.statValue}>{doctor.experience}</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
          <View style={styles.statCard}>
            <Languages size={20} color={colors.tint} />
            <Text style={styles.statValue}>{doctor.languages.length}</Text>
            <Text style={styles.statLabel}>Languages</Text>
          </View>
          <View style={styles.statCard}>
            <Star size={20} color={colors.tint} />
            <Text style={styles.statValue}>{doctor.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Doctor</Text>
          <Text style={styles.aboutText}>{doctor.about}</Text>
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.languagesContainer}>
            {doctor.languages.map((lang, index) => (
              <View key={index} style={styles.languageChip}>
                <Text style={styles.languageText}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {doctor.education.map((edu, index) => (
            <View key={index} style={styles.educationRow}>
              <GraduationCap size={18} color={colors.tint} />
              <Text style={styles.educationText}>{edu}</Text>
            </View>
          ))}
        </View>

        {/* Consultation Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consultation Types</Text>
          <View style={styles.consultationTypes}>
            <View style={styles.consultationType}>
              <View style={[styles.typeIcon, { backgroundColor: "#E0F2FE" }]}>
                <Video size={20} color="#0891B2" />
              </View>
              <View style={styles.typeInfo}>
                <Text style={styles.typeName}>Video Consultation</Text>
                <Text style={styles.typePrice}>{formatPrice(doctor.price)}</Text>
              </View>
            </View>
            <View style={styles.consultationType}>
              <View style={[styles.typeIcon, { backgroundColor: "#DCFCE7" }]}>
                <Building2 size={20} color="#10B981" />
              </View>
              <View style={styles.typeInfo}>
                <Text style={styles.typeName}>In-Person Visit</Text>
                <Text style={styles.typePrice}>{formatPrice(doctor.price + 500)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Availability */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Available</Text>
          <View style={styles.availabilityCard}>
            <Calendar size={20} color={colors.tint} />
            <Text style={styles.availabilityText}>
              {doctor.availableToday
                ? `Available Today - ${doctor.nextAvailable}`
                : doctor.nextAvailable}
            </Text>
            {doctor.availableToday && (
              <View style={styles.availableBadge}>
                <Text style={styles.availableBadgeText}>Now</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Booking Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Consultation Fee</Text>
          <Text style={styles.price}>{formatPrice(doctor.price)}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => router.push(`/booking/${doctor.id}`)}
        >
          <Calendar size={18} color="#FFFFFF" />
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  doctorCard: {
    marginHorizontal: 20,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 16,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: colors.tint,
    fontWeight: "500",
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 13,
    color: colors.textMuted,
    marginLeft: 4,
  },
  hospitalRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  hospitalText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  cityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cityText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
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
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginTop: 8,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  languagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  languageChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 20,
  },
  languageText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.text,
  },
  educationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  educationText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 10,
  },
  consultationTypes: {
    gap: 12,
  },
  consultationType: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  typeInfo: {
    flex: 1,
    marginLeft: 14,
  },
  typeName: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
  },
  typePrice: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.tint,
  },
  availabilityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  availabilityText: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  availableBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#DCFCE7",
    borderRadius: 12,
  },
  availableBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10B981",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 2,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.tint,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },
  bookButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
