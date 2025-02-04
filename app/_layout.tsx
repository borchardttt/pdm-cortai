import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Button, Pressable } from "react-native";
import { useFonts } from "expo-font";
import Colors from "@/constants/Colors";
import { Stack, Link } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/components/useColorScheme";
import { useRouter } from "expo-router";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "auth/login",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="barbeiro/ganhos-semanais" options={{
          title: "Ganhos Semanais", headerShown: true,headerLeft: () => (
              <Button
              onPress={() => router.back()}
              title="Voltar"
              color="#fff"
              />
            ) }}
        />
        <Stack.Screen
          name="barbeiro/barbeiro-home"
          options={{
            title: "Home do Barbeiro",
            headerShown: true,
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <Link href="/auth/login" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="sign-out"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
            headerLeft: () => (
              <Button
              onPress={() => router.back()}
              title="Voltar"
              color="#fff"
              />
            )
          }}
        />
        <Stack.Screen
          name="barbeiro/servicos-agendados"
          options={{
            title: "Serviços Agendados",
            headerShown: true,
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <Button
                onPress={() => alert('Informações')}
                title="Info"
                color="#fff"
              />
            ),
            headerLeft: () => (
              <Button
              onPress={() => router.back()}
              title="Voltar"
              color="#fff"
              />
            )
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
