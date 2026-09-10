import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBar } from "../components/HeaderBar";
import { useShop } from "../context/ShopContext";
import { colors, space, typography } from "../theme/tokens";
import { formatNGN } from "../utils/format";

type Props = { embedded?: boolean };

export function OrdersScreen({ embedded }: Props) {
  const { orders } = useShop();

  return (
    <SafeAreaView style={styles.safe} edges={embedded ? [] : ["top"]}>
      {!embedded ? <HeaderBar title="Orders" showBack /> : null}
      {embedded ? (
        <View style={styles.tabHeader}>
          <Text style={styles.tabTitle}>Orders</Text>
        </View>
      ) : null}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptySub}>
              Complete a Paystack mock checkout to see orders here.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.id}>{item.id}</Text>
              <Text style={styles.status}>PAID</Text>
            </View>
            <Text style={styles.meta}>
              {new Date(item.createdAt).toLocaleString("en-NG", {
                timeZone: "Africa/Lagos",
              })}{" "}
              · {item.lines.reduce((n, l) => n + l.qty, 0)} item(s)
            </Text>
            <Text style={styles.total}>{formatNGN(item.subtotalNGN)}</Text>
            {item.lines.map((l) => (
              <Text key={l.key} style={styles.line}>
                {l.qty}× {l.name} · {l.colorName} / {l.size}
              </Text>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  tabHeader: {
    paddingHorizontal: space.gutter,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  tabTitle: { ...typography.title, color: colors.text },
  list: { padding: space.gutter, gap: 12, paddingBottom: 40 },
  empty: { paddingTop: 48, alignItems: "center" },
  emptyTitle: { ...typography.title, color: colors.text },
  emptySub: {
    ...typography.body,
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: space.cardRadius,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  id: { ...typography.bodyStrong, color: colors.text },
  status: { ...typography.micro, color: colors.success },
  meta: { ...typography.caption, color: colors.muted },
  total: { ...typography.bodyStrong, color: colors.text, marginTop: 4 },
  line: { ...typography.caption, color: colors.muted },
});
