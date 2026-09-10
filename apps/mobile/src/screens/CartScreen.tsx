import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HeaderBar } from "../components/HeaderBar";
import { PrimaryButton } from "../components/PrimaryButton";
import { TrustBar } from "../components/TrustBar";
import { useShop } from "../context/ShopContext";
import { colors, space, typography } from "../theme/tokens";
import { formatNGN } from "../utils/format";
import type { RootStackParamList } from "../navigation/types";

export function CartScreen() {
  const { cart, cartSubtotal, setQty, removeLine } = useShop();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <HeaderBar title="Bag" showBack />
      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptySub}>
            Browse the edit and add something you love.
          </Text>
          <PrimaryButton
            label="Continue shopping"
            onPress={() => navigation.navigate("MainTabs")}
            style={{ marginTop: 20, alignSelf: "stretch" }}
          />
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.list}>
            {cart.map((line) => (
              <View key={line.key} style={styles.line}>
                <Image source={{ uri: line.image }} style={styles.thumb} />
                <View style={styles.meta}>
                  <Text style={styles.name} numberOfLines={2}>
                    {line.name}
                  </Text>
                  <Text style={styles.variant}>
                    {line.colorName} · {line.size}
                  </Text>
                  <Text style={styles.price}>
                    {formatNGN(line.unitPriceNGN)}
                  </Text>
                  <View style={styles.stepper}>
                    <Pressable
                      onPress={() => setQty(line.key, line.qty - 1)}
                      style={styles.stepBtn}
                      accessibilityLabel="Decrease quantity"
                    >
                      <Text style={styles.stepTxt}>−</Text>
                    </Pressable>
                    <Text style={styles.qty}>{line.qty}</Text>
                    <Pressable
                      onPress={() => setQty(line.key, line.qty + 1)}
                      style={styles.stepBtn}
                      accessibilityLabel="Increase quantity"
                    >
                      <Text style={styles.stepTxt}>+</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => removeLine(line.key)}
                      style={styles.remove}
                    >
                      <Text style={styles.removeTxt}>Remove</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                {formatNGN(cartSubtotal)}
              </Text>
            </View>
            <PrimaryButton
              label="Checkout"
              onPress={() => navigation.navigate("Checkout")}
            />
            <TrustBar />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  empty: {
    flex: 1,
    padding: space.gutter,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: { ...typography.title, color: colors.text },
  emptySub: {
    ...typography.body,
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
  },
  list: { padding: space.gutter, gap: 16, paddingBottom: 24 },
  line: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: colors.surface,
    borderRadius: space.cardRadius,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  thumb: {
    width: 88,
    height: 117,
    borderRadius: 12,
    backgroundColor: colors.border,
  },
  meta: { flex: 1, gap: 4 },
  name: { ...typography.bodyStrong, color: colors.text },
  variant: { ...typography.caption, color: colors.muted },
  price: { ...typography.bodyStrong, color: colors.text, marginTop: 4 },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  stepBtn: {
    width: space.tapMin,
    height: space.tapMin,
    borderRadius: space.chipRadius,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg,
  },
  stepTxt: { fontSize: 20, color: colors.text, fontWeight: "600" },
  qty: { ...typography.bodyStrong, color: colors.text, minWidth: 20, textAlign: "center" },
  remove: { marginLeft: "auto", minHeight: space.tapMin, justifyContent: "center" },
  removeTxt: { ...typography.caption, color: colors.danger },
  footer: {
    padding: space.gutter,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    gap: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: { ...typography.body, color: colors.muted },
  summaryValue: { ...typography.bodyStrong, color: colors.text },
});
