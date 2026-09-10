import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HeaderBar } from "../components/HeaderBar";
import { PrimaryButton } from "../components/PrimaryButton";
import { useShop } from "../context/ShopContext";
import { colors, space, typography } from "../theme/tokens";
import { formatNGN } from "../utils/format";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "OrderConfirmation">;

export function OrderConfirmationScreen({ route, navigation }: Props) {
  const { orders } = useShop();
  const order = orders.find((o) => o.id === route.params.orderId);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <HeaderBar title="Confirmed" showBack />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>PAYMENT SUCCESSFUL</Text>
        <Text style={styles.title}>Thank you</Text>
        <Text style={styles.body}>
          Paystack mock approved your order
          {order ? ` ${order.id}` : ""}. A confirmation would go to{" "}
          {order?.guestEmail ?? "your email"}.
        </Text>
        {order ? (
          <Text style={styles.total}>
            Total paid · {formatNGN(order.subtotalNGN)}
          </Text>
        ) : null}
        <PrimaryButton
          label="View orders"
          onPress={() => navigation.replace("Orders")}
          style={{ marginTop: 24 }}
        />
        <PrimaryButton
          label="Continue shopping"
          onPress={() => navigation.popToTop()}
          style={{ marginTop: 12, backgroundColor: colors.text }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space.gutter, flex: 1 },
  eyebrow: { ...typography.micro, color: colors.success, marginBottom: 8 },
  title: { ...typography.display, color: colors.text },
  body: { ...typography.body, color: colors.muted, marginTop: 12 },
  total: { ...typography.bodyStrong, color: colors.text, marginTop: 20 },
});
