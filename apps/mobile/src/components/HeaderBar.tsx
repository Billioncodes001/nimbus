import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors, space, typography } from "../theme/tokens";
import { useShop } from "../context/ShopContext";
import type { RootStackParamList } from "../navigation/types";

type Props = { title?: string; showBack?: boolean };

export function HeaderBar({ title = "Nimbus", showBack }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cartCount } = useShop();

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        {showBack ? (
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={8}
            style={styles.iconBtn}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </Pressable>
        ) : (
          <Text style={styles.wordmark}>{title}</Text>
        )}
        {showBack ? <Text style={styles.backTitle}>{title}</Text> : null}
      </View>
      <Pressable
        onPress={() => navigation.navigate("Cart")}
        style={styles.iconBtn}
        accessibilityRole="button"
        accessibilityLabel={`Bag, ${cartCount} items`}
      >
        <Ionicons name="bag-outline" size={24} color={colors.text} />
        {cartCount > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {cartCount > 99 ? "99+" : cartCount}
            </Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: space.gutter,
    paddingVertical: 12,
    backgroundColor: colors.bg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    minHeight: space.tapMin + 8,
  },
  left: { flexDirection: "row", alignItems: "center", gap: 4, flex: 1 },
  wordmark: { ...typography.title, color: colors.text, letterSpacing: 0.5 },
  backTitle: { ...typography.title, color: colors.text, flexShrink: 1 },
  iconBtn: {
    width: space.tapMin,
    height: space.tapMin,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: { color: colors.surface, fontSize: 10, fontWeight: "700" },
});
