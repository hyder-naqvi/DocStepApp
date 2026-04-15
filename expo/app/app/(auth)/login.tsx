import React, { useState } from "react";
import {
  ActivityIndicator,
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
import Colors from "@/constants/colors";
import { useAuth } from "@/contexts/auth-context";

export default function LoginScreen() {
  const router = useRouter();
  const { user, signIn, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && user) {
    return <Redirect href="/(tabs)" />;
  }

  const handleLogin = async () => {
    setError("");
    setIsSubmitting(true);
    const result = await signIn(email, password);
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? "Unable to login right now.");
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
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Login to continue using DocStep.</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.light.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.light.textMuted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </Pressable>
        </View>

        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Link href="/(auth)/signup" style={styles.linkText}>
            Sign up
          </Link>
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 24,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.light.textSecondary,
  },
  form: {
    gap: 12,
  },
  input: {
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.light.text,
  },
  button: {
    marginTop: 4,
    borderRadius: 12,
    backgroundColor: Colors.light.tint,
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
    color: Colors.light.danger,
    fontSize: 14,
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  linkText: {
    color: Colors.light.tint,
    fontWeight: "600",
  },
});
