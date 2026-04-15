import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Search,
  SlidersHorizontal,
  Star,
  MapPin,
  Stethoscope,
} from "lucide-react-native";

// DocStep - Find Doctors Screen
import Colors from "@/constants/colors";
import { useTheme } from "@/contexts/theme-context";
import { doctors, medicalSpecialties } from "@/constants/mockData";

export default function DoctorsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const isWeb = Platform.OS === "web";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === null || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Find Doctors</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Book appointments with top specialists</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors, specialties..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal size={20} color={colors.tint} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, isWeb && styles.webContent]}
      >
        {/* Specialties */}
        <View style={styles.specialtiesSection}>
          <Text style={styles.sectionTitle}>Specialties</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.specialtyScroll}
          >
            <Pressable
              style={[styles.specialtyChip, !selectedSpecialty && styles.specialtyChipActive]}
              onPress={() => setSelectedSpecialty(null)}
            >
              <Text
                style={[
                  styles.specialtyChipText,
                  !selectedSpecialty && styles.specialtyChipTextActive,
                ]}
              >
                All
              </Text>
            </Pressable>
            {medicalSpecialties.map((specialty, index) => (
              <Pressable
                key={index}
                style={[
                  styles.specialtyChip,
                  selectedSpecialty === specialty.name && styles.specialtyChipActive,
                ]}
                onPress={() => setSelectedSpecialty(specialty.name)}
              >
                <Text
                  style={[
                    styles.specialtyChipText,
                    selectedSpecialty === specialty.name && styles.specialtyChipTextActive,
                  ]}
                >
                  {specialty.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredDoctors.length} {filteredDoctors.length === 1 ? "doctor" : "doctors"} found
          </Text>
          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortText}>Sort by: Recommended</Text>
          </TouchableOpacity>
        </View>

        {/* Doctor Cards */}
        <View style={styles.doctorsList}>
          {filteredDoctors.map((doctor) => (
            <TouchableOpacity key={doctor.id} style={styles.doctorCard} onPress={() => router.push(`/doctor/${doctor.id}`)}>
              <View style={styles.cardHeader}>
                <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
                <View style={styles.cardHeaderInfo}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                  <View style={styles.ratingRow}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.ratingText}>{doctor.rating}</Text>
                    <Text style={styles.reviewsText}>({doctor.reviews} reviews)</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.availabilityBadge,
                    doctor.availableToday ? styles.availableBadge : styles.unavailableBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.availabilityText,
                      doctor.availableToday ? styles.availableText : styles.unavailableText,
                    ]}
                  >
                    {doctor.availableToday ? "Available" : "Busy"}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.cardDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={16} color={Colors.light.textMuted} />
                  <Text style={styles.detailText}>{doctor.experience} experience</Text>
                </View>
                <View style={styles.detailRow}>
                  <Stethoscope size={16} color={Colors.light.textMuted} />
                  <Text style={styles.detailText}>{doctor.languages.join(", ")}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Consultation</Text>
                  <Text style={styles.price}>Rs. {doctor.price.toLocaleString('en-PK')}</Text>
                </View>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredDoctors.length === 0 && (
          <View style={styles.emptyState}>
            <Stethoscope size={48} color={Colors.light.textMuted} />
            <Text style={styles.emptyTitle}>No doctors found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.light.text,
    marginLeft: 12,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: Colors.light.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  webContent: {
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
    paddingBottom: 48,
  },
  specialtiesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  specialtyScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  specialtyChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: Colors.light.backgroundSecondary,
    marginRight: 8,
  },
  specialtyChipActive: {
    backgroundColor: Colors.light.tint,
  },
  specialtyChipText: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.light.textSecondary,
  },
  specialtyChipTextActive: {
    color: "#FFFFFF",
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.textSecondary,
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 8,
  },
  sortText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.light.textSecondary,
  },
  doctorsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  doctorCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  doctorImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  cardHeaderInfo: {
    flex: 1,
    marginLeft: 14,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.light.text,
  },
  reviewsText: {
    fontSize: 12,
    color: Colors.light.textMuted,
  },
  availabilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  availableBadge: {
    backgroundColor: "#DCFCE7",
  },
  unavailableBadge: {
    backgroundColor: Colors.light.backgroundSecondary,
  },
  availabilityText: {
    fontSize: 11,
    fontWeight: "600",
  },
  availableText: {
    color: Colors.light.success,
  },
  unavailableText: {
    color: Colors.light.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: 14,
  },
  cardDetails: {
    gap: 8,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {},
  priceLabel: {
    fontSize: 12,
    color: Colors.light.textMuted,
    marginBottom: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
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
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
});
