import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TRUST_LINE, colors, space, typography } from "../theme/tokens";

export function TrustBar() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{TRUST_LINE}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: space.gutter,
    paddingVertical: 10,
    backgroundColor: colors.bg,
  },
  text: { ...typography.caption, color: colors.muted, textAlign: "center" },
});
