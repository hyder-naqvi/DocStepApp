import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// DocStep - Welcome Modal
import Colors from "@/constants/colors";
import { useTheme } from "@/contexts/theme-context";

export default function ModalScreen() {
  const { colors, isDark } = useTheme();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={() => router.back()}
    >
      <Pressable style={styles.overlay} onPress={() => router.back()}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>👋</Text>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Welcome to DocStep</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Your trusted telehealth companion. Book appointments, consult with doctors, and manage your health - all in one place.
          </Text>

          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: colors.tint }]}
            onPress={() => router.back()}
          >
            <Text style={styles.closeButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </Pressable>

      <StatusBar style={isDark || Platform.OS === "ios" ? "light" : "auto"} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Colors.light.card,
    borderRadius: 24,
    padding: 32,
    margin: 20,
    alignItems: "center",
    minWidth: 300,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 12,
  },
  description: {
    textAlign: "center",
    marginBottom: 28,
    color: Colors.light.textSecondary,
    lineHeight: 22,
    fontSize: 15,
  },
  closeButton: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    minWidth: 160,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 15,
  },
});
