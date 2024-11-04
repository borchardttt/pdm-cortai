import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from "@/app/(tabs)";

SplashScreen.preventAutoHideAsync().then();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Montserrat_400Regular, // Fonte regular
    Montserrat_700Bold, // Fonte bold
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().then();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="CreateUser"
          options={{
            headerShown: true,
            headerTitle: 'Criar Usuário',
            headerStyle: { backgroundColor: '#D9B892' },
            headerTintColor: '#333',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Montserrat_700Bold',
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
