import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeft,
  Clock,
  Video,
  MapPin,
  Check,
  Building2,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/colors";
import { doctors, timeSlots } from "@/constants/mockData";
import { useTheme } from "@/contexts/theme-context";

const days = [
  { day: "Today", date: "Today" },
  { day: "Tomorrow", date: "Tomorrow" },
  { day: "Wed", date: "Wed, Apr 16" },
  { day: "Thu", date: "Thu, Apr 17" },
  { day: "Fri", date: "Fri, Apr 18" },
  { day: "Sat", date: "Sat, Apr 19" },
  { day: "Sun", date: "Sun, Apr 20" },
];

type ConsultationType = "video" | "in-person";

export default function BookingScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const doctor = doctors.find((d) => d.id === id);

  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState<ConsultationType>("video");

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

  const getTotalPrice = () => {
    const basePrice = doctor.price;
    return consultationType === "in-person" ? basePrice + 500 : basePrice;
  };

  const handleConfirmBooking = () => {
    if (!selectedTime) {
      Alert.alert("Select Time", "Please select a time slot for your appointment");
      return;
    }

    Alert.alert(
      "Confirm Booking",
      `Book appointment with ${doctor.name} on ${days[selectedDate].date} at ${selectedTime}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            Alert.alert("Success", "Your appointment has been booked successfully!", [
              { text: "OK", onPress: () => router.push("/appointments") },
            ]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Book Appointment</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Doctor Info Card */}
        <View style={styles.doctorCard}>
          <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
            <View style={styles.hospitalRow}>
              <Building2 size={14} color={colors.textMuted} />
              <Text style={styles.hospitalText}>{doctor.hospital}</Text>
            </View>
          </View>
        </View>

        {/* Consultation Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consultation Type</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeCard,
                consultationType === "video" && styles.typeCardActive,
              ]}
              onPress={() => setConsultationType("video")}
            >
              <View
                style={[
                  styles.typeIcon,
                  { backgroundColor: consultationType === "video" ? "#0891B2" : "#E0F2FE" },
                ]}
              >
                <Video
                  size={20}
                  color={consultationType === "video" ? "#FFFFFF" : "#0891B2"}
                />
              </View>
              <Text
                style={[
                  styles.typeName,
                  consultationType === "video" && styles.typeNameActive,
                ]}
              >
                Video Call
              </Text>
              <Text style={styles.typePrice}>{formatPrice(doctor.price)}</Text>
              {consultationType === "video" && (
                <View style={styles.checkBadge}>
                  <Check size={12} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeCard,
                consultationType === "in-person" && styles.typeCardActive,
              ]}
              onPress={() => setConsultationType("in-person")}
            >
              <View
                style={[
                  styles.typeIcon,
                  { backgroundColor: consultationType === "in-person" ? "#10B981" : "#DCFCE7" },
                ]}
              >
                <MapPin
                  size={20}
                  color={consultationType === "in-person" ? "#FFFFFF" : "#10B981"}
                />
              </View>
              <Text
                style={[
                  styles.typeName,
                  consultationType === "in-person" && styles.typeNameActive,
                ]}
              >
                In-Person
              </Text>
              <Text style={styles.typePrice}>{formatPrice(doctor.price + 500)}</Text>
              {consultationType === "in-person" && (
                <View style={[styles.checkBadge, { backgroundColor: "#10B981" }]}>
                  <Check size={12} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateScroll}
          >
            {days.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateCard,
                  selectedDate === index && styles.dateCardActive,
                ]}
                onPress={() => setSelectedDate(index)}
              >
                <Text
                  style={[
                    styles.dayName,
                    selectedDate === index && styles.dayNameActive,
                  ]}
                >
                  {day.day}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === index && styles.dateTextActive,
                  ]}
                >
                  {day.date.includes(",") ? day.date.split(",")[1] : day.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotActive,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Clock
                  size={14}
                  color={selectedTime === time ? "#FFFFFF" : colors.textMuted}
                />
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.timeTextActive,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Consultation Fee</Text>
            <Text style={styles.summaryValue}>{formatPrice(doctor.price)}</Text>
          </View>
          {consultationType === "in-person" && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Clinic Visit</Text>
              <Text style={styles.summaryValue}>{formatPrice(500)}</Text>
            </View>
          )}
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>{formatPrice(getTotalPrice())}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total</Text>
          <Text style={styles.price}>{formatPrice(getTotalPrice())}</Text>
        </View>
        <TouchableOpacity
          style={[styles.confirmButton, !selectedTime && styles.confirmButtonDisabled]}
          onPress={handleConfirmBooking}
          disabled={!selectedTime}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
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
    backgroundColor: Colors.light.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.light.text,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  doctorCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  doctorImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 14,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: Colors.light.tint,
    marginBottom: 4,
  },
  hospitalRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  hospitalText: {
    fontSize: 12,
    color: Colors.light.textMuted,
    marginLeft: 4,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  typeCard: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.light.border,
    position: "relative",
  },
  typeCardActive: {
    borderColor: Colors.light.tint,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  typeName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  typeNameActive: {
    color: Colors.light.tint,
  },
  typePrice: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.textMuted,
  },
  checkBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
  },
  dateScroll: {
    gap: 10,
  },
  dateCard: {
    width: 80,
    height: 90,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.light.border,
  },
  dateCardActive: {
    borderColor: Colors.light.tint,
    backgroundColor: Colors.light.tint,
  },
  dayName: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  dayNameActive: {
    color: "#FFFFFF",
  },
  dateText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.light.text,
  },
  dateTextActive: {
    color: "#FFFFFF",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  timeSlot: {
    width: "23%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  timeSlotActive: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  timeText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.light.text,
  },
  timeTextActive: {
    color: "#FFFFFF",
  },
  summaryCard: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.tint,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.card,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.light.textMuted,
    marginBottom: 2,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.light.text,
  },
  confirmButton: {
    flex: 1.5,
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  confirmButtonDisabled: {
    backgroundColor: Colors.light.textMuted,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
