import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { Box, useTheme } from "native-base";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { AppRoutes } from "./app.routes";
import Constants from "expo-constants"
import * as SecureStore from "expo-secure-store";
import { ptBR } from "@clerk/localizations";

export function Routes () {
  const { colors } = useTheme()
  const theme = DefaultTheme;
  theme.colors.background= colors.gray['700']

  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
      tokenCache={tokenCache}
      localization={ptBR}
    >
      <Box flex={1} bg="gray.700">
        <NavigationContainer>
          <SignedIn>
            <AppRoutes />
          </SignedIn>
          <SignedOut>
            <AuthRoutes />
          </SignedOut>
        </NavigationContainer>
      </Box>
    </ClerkProvider>
  )
}