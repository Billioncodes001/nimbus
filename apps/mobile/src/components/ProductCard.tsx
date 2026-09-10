import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { Product } from "@nimbus/catalog";
import { colors, shadow, space, typography } from "../theme/tokens";
import { formatNGN } from "../utils/format";

type Props = {
  product: Product;
  onPress: () => void;
  width: number;
};

export function ProductCard({ product, onPress, width }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, shadow.card, { width }]}
      accessibilityRole="button"
      accessibilityLabel={product.name}
    >
      <Image
        source={{ uri: product.images[0] }}
        style={[styles.image, { width, height: Math.round(width * (4 / 3)) }]}
        resizeMode="cover"
      />
      <View style={styles.meta}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>{formatNGN(product.priceNGN)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: space.cardRadius,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: { backgroundColor: colors.border },
  meta: { padding: 12, gap: 4 },
  name: { ...typography.body, color: colors.text },
  price: { ...typography.bodyStrong, color: colors.text },
});
