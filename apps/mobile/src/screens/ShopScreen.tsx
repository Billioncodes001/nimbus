import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getFeaturedProducts, getProductsByCategory } from "@nimbus/catalog";
import { HeaderBar } from "../components/HeaderBar";
import { TrustBar } from "../components/TrustBar";
import { CategoryChips } from "../components/CategoryChips";
import { ProductCard } from "../components/ProductCard";
import { colors, space, typography } from "../theme/tokens";
import type { RootStackParamList } from "../navigation/types";

export function ShopScreen() {
  const [category, setCategory] = useState("all");
  const { width } = useWindowDimensions();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const gutter = space.gutter;
  const gap = 12;
  const cardWidth = (width - gutter * 2 - gap) / 2;

  const products = useMemo(() => {
    if (category === "all") {
      const featured = getFeaturedProducts();
      const rest = getProductsByCategory("all").filter((p) => !p.featured);
      return [...featured, ...rest];
    }
    return getProductsByCategory(category);
  }, [category]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <HeaderBar />
      <TrustBar />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <Text style={styles.display}>Editorial essentials</Text>
            <Text style={styles.sub}>
              West African craft meets quiet luxury — curated for Nigeria.
            </Text>
            <CategoryChips selected={category} onSelect={setCategory} />
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            width={cardWidth}
            onPress={() =>
              navigation.navigate("Product", { productId: item.id })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  list: { paddingBottom: 40, paddingHorizontal: space.gutter },
  row: { justifyContent: "space-between" },
  headerBlock: { gap: 12, marginBottom: space.section, marginTop: 8 },
  display: { ...typography.display, color: colors.text },
  sub: { ...typography.body, color: colors.muted, marginBottom: 8 },
});
