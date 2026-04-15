const primary = "#0891B2";
const secondary = "#0EA5E9";
const accent = "#06B6D4";
const success = "#10B981";
const warning = "#F59E0B";
const danger = "#EF4444";

const gray50 = "#F9FAFB";
const gray100 = "#F3F4F6";
const gray200 = "#E5E7EB";
const gray300 = "#D1D5DB";
const gray400 = "#9CA3AF";
const gray500 = "#6B7280";
const gray600 = "#4B5563";
const gray700 = "#374151";
const gray800 = "#1F2937";
const gray900 = "#111827";

export default {
  light: {
    text: gray900,
    textSecondary: gray500,
    textMuted: gray400,
    background: "#FFFFFF",
    backgroundSecondary: gray50,
    backgroundTertiary: gray100,
    tint: primary,
    tintSecondary: secondary,
    accent,
    success,
    warning,
    danger,
    border: gray200,
    borderLight: gray100,
    card: "#FFFFFF",
    tabIconDefault: gray400,
    tabIconSelected: primary,
    overlay: "rgba(0, 0, 0, 0.5)",
    gradientStart: "#0891B2",
    gradientEnd: "#06B6D4",
  },
  dark: {
    text: "#FFFFFF",
    textSecondary: gray300,
    textMuted: gray400,
    background: gray900,
    backgroundSecondary: gray800,
    backgroundTertiary: gray700,
    tint: accent,
    tintSecondary: secondary,
    accent,
    success,
    warning,
    danger,
    border: gray700,
    borderLight: gray800,
    card: gray800,
    tabIconDefault: gray500,
    tabIconSelected: accent,
    overlay: "rgba(0, 0, 0, 0.7)",
    gradientStart: "#0891B2",
    gradientEnd: "#06B6D4",
  },
};

export const medicalSpecialties = [
  { name: "General Practitioner", icon: "Stethoscope", color: "#0891B2" },
  { name: "Cardiologist", icon: "Heart", color: "#EF4444" },
  { name: "Dermatologist", icon: "Sparkles", color: "#8B5CF6" },
  { name: "Pediatrician", icon: "Baby", color: "#F59E0B" },
  { name: "Neurologist", icon: "Brain", color: "#EC4899" },
  { name: "Orthopedist", icon: "Bone", color: "#10B981" },
  { name: "Psychiatrist", icon: "BrainCircuit", color: "#6366F1" },
  { name: "Ophthalmologist", icon: "Eye", color: "#06B6D4" },
];
