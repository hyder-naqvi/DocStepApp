import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import Colors from "@/constants/colors";
import { useAuth } from "@/contexts/auth-context";

export default function IndexScreen() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.light.background,
        }}
      >
        <ActivityIndicator color={Colors.light.tint} size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
