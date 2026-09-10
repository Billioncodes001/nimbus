import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ShopProvider } from "./src/context/ShopContext";
import { RootNavigator } from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ShopProvider>
          <RootNavigator />
          <StatusBar style="dark" />
        </ShopProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
