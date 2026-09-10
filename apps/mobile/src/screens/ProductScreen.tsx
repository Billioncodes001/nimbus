import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getProductById } from "@nimbus/catalog";
import { HeaderBar } from "../components/HeaderBar";
import { PrimaryButton } from "../components/PrimaryButton";
import { useShop } from "../context/ShopContext";
import { colors, space, typography } from "../theme/tokens";
import { formatNGN } from "../utils/format";
import { findVariant, isVariantOOS } from "../utils/catalog";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Product">;

const { width: SCREEN_W } = Dimensions.get("window");
const GALLERY_H = Math.round(SCREEN_W * (4 / 3));

export function ProductScreen({ route }: Props) {
  const product = getProductById(route.params.productId);
  const { addToCart } = useShop();
  const [imageIndex, setImageIndex] = useState(0);
  const [colorId, setColorId] = useState(product?.colors[0]?.id ?? "");
  const [size, setSize] = useState(product?.sizes[0] ?? "");
  const [addedFlash, setAddedFlash] = useState(false);

  const oos = useMemo(() => {
    if (!product) return true;
    return isVariantOOS(product, colorId, size);
  }, [product, colorId, size]);

  const variant = product ? findVariant(product, colorId, size) : undefined;
  const selectedColor = product?.colors.find((c) => c.id === colorId);

  if (!product) {
    return (
      <SafeAreaView style={styles.safe}>
        <HeaderBar title="Product" showBack />
        <View style={styles.missing}>
          <Text style={styles.body}>Product not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const onAdd = () => {
    if (oos) return;
    addToCart({ product, colorId, size });
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1200);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <HeaderBar title={product.name} showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const i = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
            setImageIndex(i);
          }}
        >
          {product.images.map((uri) => (
            <Image
              key={uri}
              source={{ uri }}
              style={{ width: SCREEN_W, height: GALLERY_H }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        <View style={styles.thumbs}>
          {product.images.map((uri, i) => (
            <Pressable key={uri} onPress={() => setImageIndex(i)}>
              <Image
                source={{ uri }}
                style={[
                  styles.thumb,
                  i === imageIndex && styles.thumbActive,
                ]}
              />
            </Pressable>
          ))}
        </View>

        <View style={styles.bodyPad}>
          <Text style={styles.title}>{product.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatNGN(product.priceNGN)}</Text>
            {product.compareAtNGN ? (
              <Text style={styles.compare}>
                {formatNGN(product.compareAtNGN)}
              </Text>
            ) : null}
          </View>
          <Text style={styles.desc}>{product.description}</Text>

          <Text style={styles.sectionLabel}>Color</Text>
          <View style={styles.swatchRow}>
            {product.colors.map((c) => {
              const active = c.id === colorId;
              return (
                <Pressable
                  key={c.id}
                  onPress={() => setColorId(c.id)}
                  style={styles.swatchItem}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <View
                    style={[
                      styles.swatchOuter,
                      active && styles.swatchOuterActive,
                    ]}
                  >
                    <View
                      style={[styles.swatchInner, { backgroundColor: c.hex }]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.swatchName,
                      active && styles.swatchNameActive,
                    ]}
                  >
                    {c.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.sectionLabel}>Size</Text>
          <View style={styles.sizeRow}>
            {product.sizes.map((s) => {
              const active = s === size;
              const sizeOos = isVariantOOS(product, colorId, s);
              return (
                <Pressable
                  key={s}
                  onPress={() => setSize(s)}
                  style={[
                    styles.sizeChip,
                    active && styles.sizeChipActive,
                    sizeOos && styles.sizeChipOos,
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active, disabled: sizeOos }}
                >
                  <Text
                    style={[
                      styles.sizeLabel,
                      active && styles.sizeLabelActive,
                      sizeOos && styles.sizeLabelOos,
                    ]}
                  >
                    {s}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {oos ? (
            <Text style={styles.oosBanner}>
              Out of stock
              {selectedColor ? ` · ${selectedColor.name}` : ""}
              {size ? ` / ${size}` : ""}
            </Text>
          ) : variant ? (
            <Text style={styles.inStock}>
              In stock · {variant.inventory} left
            </Text>
          ) : null}

          {product.materials ? (
            <Text style={styles.metaLine}>Materials · {product.materials}</Text>
          ) : null}
          {product.care ? (
            <Text style={styles.metaLine}>Care · {product.care}</Text>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.sticky}>
        <PrimaryButton
          label={
            oos
              ? "Out of stock"
              : addedFlash
                ? "Added to bag"
                : "Add to bag"
          }
          onPress={onAdd}
          disabled={oos}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: 120 },
  missing: { padding: space.gutter },
  body: { ...typography.body, color: colors.muted },
  thumbs: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: space.gutter,
    paddingVertical: 12,
  },
  thumb: {
    width: 56,
    height: 74,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  thumbActive: { borderColor: colors.accent, borderWidth: 2 },
  bodyPad: { paddingHorizontal: space.gutter, gap: 10 },
  title: { ...typography.title, color: colors.text },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  price: { ...typography.bodyStrong, color: colors.text },
  compare: {
    ...typography.caption,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  desc: { ...typography.body, color: colors.muted, marginBottom: 8 },
  sectionLabel: {
    ...typography.micro,
    color: colors.muted,
    marginTop: 8,
  },
  swatchRow: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  swatchItem: { alignItems: "center", gap: 6, minWidth: 72 },
  swatchOuter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  swatchOuterActive: { borderColor: colors.accent },
  swatchInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  swatchName: { ...typography.caption, color: colors.muted },
  swatchNameActive: { color: colors.text, fontWeight: "600" },
  sizeRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  sizeChip: {
    minWidth: space.tapMin,
    minHeight: space.tapMin,
    paddingHorizontal: 16,
    borderRadius: space.chipRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeChipActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  sizeChipOos: { opacity: 0.4 },
  sizeLabel: { ...typography.bodyStrong, color: colors.text },
  sizeLabelActive: { color: colors.surface },
  sizeLabelOos: { textDecorationLine: "line-through" },
  oosBanner: {
    ...typography.bodyStrong,
    color: colors.danger,
    marginTop: 8,
  },
  inStock: { ...typography.caption, color: colors.success, marginTop: 4 },
  metaLine: { ...typography.caption, color: colors.muted },
  sticky: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: space.gutter,
    paddingBottom: 28,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
