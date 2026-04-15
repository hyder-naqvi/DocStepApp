import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, Redirect, useRouter } from "expo-router";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";

export default function SignupScreen() {
  const router = useRouter();
  const { user, signUp, isLoading } = useAuth();
  const { colors } = useTheme();
  const isWeb = Platform.OS === "web";
  const styles = React.useMemo(() => createStyles(colors, isWeb), [colors, isWeb]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && user) {
    return <Redirect href="/(tabs)" />;
  }

  const handleSignup = async () => {
    setError("");
    setIsSubmitting(true);
    const result = await signUp(name, email, password);
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? "Unable to signup right now.");
      return;
    }

    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.panel}>
          <Image
            source={require("../../assets/images/docstep-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.header}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Sign up to book appointments in DocStep.</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Full name"
              placeholderTextColor={colors.textMuted}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password (min 6 characters)"
              placeholderTextColor={colors.textMuted}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Pressable
              style={[styles.button, isSubmitting && styles.buttonDisabled]}
              onPress={handleSignup}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Sign up</Text>
              )}
            </Pressable>
          </View>
        </View>

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Link href="/(auth)/login" style={styles.linkText}>
            Login
          </Link>
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors: typeof import("@/constants/colors").default.light, isWeb: boolean) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 24,
    maxWidth: isWeb ? 520 : undefined,
    width: "100%",
    alignSelf: "center",
  },
  panel: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: isWeb ? 1 : 0,
    borderRadius: isWeb ? 20 : 0,
    paddingHorizontal: isWeb ? 24 : 0,
    paddingVertical: isWeb ? 24 : 0,
    shadowColor: "#000",
    shadowOpacity: isWeb ? 0.08 : 0,
    shadowRadius: 14,
    elevation: isWeb ? 2 : 0,
  },
  header: {
    gap: 8,
    alignItems: "center",
  },
  logo: {
    width: 220,
    height: 120,
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
  },
  form: {
    gap: 12,
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    marginTop: 4,
    borderRadius: 12,
    backgroundColor: colors.tint,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: colors.textSecondary,
  },
  linkText: {
    color: colors.tint,
    fontWeight: "600",
  },
});
