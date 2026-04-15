import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

// DocStep - 404 Not Found Screen
import Colors from "@/constants/colors";
import { useTheme } from "@/contexts/theme-context";

export default function NotFoundScreen() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  return (
    <>
      <Stack.Screen options={{ title: "Page Not Found" }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🏥</Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>Page Not Found</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Text>

        <Link href="/" style={[styles.link, { backgroundColor: colors.tint }]}>
          <Text style={styles.linkText}>Return to Home</Text>
        </Link>
      </View>
    </>
  );
}

const createStyles = (colors: typeof import("@/constants/colors").default.light) =>
  StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.background,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    fontSize: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  link: {
    backgroundColor: colors.tint,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  linkText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
