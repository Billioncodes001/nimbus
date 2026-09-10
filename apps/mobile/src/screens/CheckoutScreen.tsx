import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HeaderBar } from "../components/HeaderBar";
import { PrimaryButton } from "../components/PrimaryButton";
import { TrustBar } from "../components/TrustBar";
import { useShop } from "../context/ShopContext";
import { colors, space, typography } from "../theme/tokens";
import { formatNGN } from "../utils/format";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;

export function CheckoutScreen({ navigation }: Props) {
  const { cart, cartSubtotal, placeOrder } = useShop();
  const [name, setName] = useState("Guest Shopper");
  const [email, setEmail] = useState("guest@nimbus.demo");
  const [paying, setPaying] = useState(false);

  const onPay = () => {
    if (cart.length === 0) return;
    setPaying(true);
    // Paystack mock stub
    setTimeout(() => {
      const order = placeOrder({ email: email.trim(), name: name.trim() });
      setPaying(false);
      navigation.replace("OrderConfirmation", { orderId: order.id });
    }, 900);
  };

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <HeaderBar title="Checkout" showBack />
        <View style={styles.empty}>
          <Text style={styles.body}>Your bag is empty.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <HeaderBar title="Checkout" showBack />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Guest checkout</Text>
          <Text style={styles.body}>
            Demo only — Paystack is mocked. No real charge.
          </Text>

          <Text style={styles.label}>Full name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor={colors.muted}
            autoCapitalize="words"
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor={colors.muted}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.summary}>
            <Text style={styles.summaryLabel}>
              {cart.reduce((n, l) => n + l.qty, 0)} item(s)
            </Text>
            <Text style={styles.summaryValue}>{formatNGN(cartSubtotal)}</Text>
          </View>

          <PrimaryButton
            label="Pay with Paystack"
            onPress={onPay}
            loading={paying}
            disabled={!email.trim()}
          />
          <TrustBar />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  empty: { padding: space.gutter },
  content: { padding: space.gutter, gap: 10, flex: 1 },
  title: { ...typography.title, color: colors.text },
  body: { ...typography.body, color: colors.muted, marginBottom: 12 },
  label: { ...typography.micro, color: colors.muted, marginTop: 8 },
  input: {
    minHeight: space.tapMin,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: space.chipRadius,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 16,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  summaryLabel: { ...typography.body, color: colors.muted },
  summaryValue: { ...typography.bodyStrong, color: colors.text },
});
