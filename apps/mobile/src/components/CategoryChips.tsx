import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { categories } from "@nimbus/catalog";
import { colors, space, typography } from "../theme/tokens";

type Props = {
  selected: string;
  onSelect: (slug: string) => void;
};

const ALL = { slug: "all", name: "All" } as const;

export function CategoryChips({ selected, onSelect }: Props) {
  const chips = [ALL, ...categories];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {chips.map((c) => {
        const active = selected === c.slug;
        return (
          <Pressable
            key={c.slug}
            onPress={() => onSelect(c.slug)}
            style={[styles.chip, active && styles.chipActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.label, active && styles.labelActive]}>
              {c.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: space.gutter,
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    minHeight: space.tapMin,
    paddingHorizontal: 16,
    borderRadius: space.chipRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  label: { ...typography.bodyStrong, color: colors.text, fontSize: 14 },
  labelActive: { color: colors.surface },
});
