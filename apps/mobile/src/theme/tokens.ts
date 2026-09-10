export const colors = {
  bg: "#F7F5F2",
  surface: "#FFFFFF",
  text: "#1A1A1A",
  muted: "#6B6560",
  border: "#E8E4DF",
  accent: "#0F6B5C",
  accentPressed: "#0A4F44",
  success: "#1B7A4E",
  warning: "#C47E00",
  danger: "#C62828",
} as const;

export const typography = {
  display: { fontSize: 32, lineHeight: 40, fontWeight: "600" as const },
  title: { fontSize: 22, lineHeight: 28, fontWeight: "600" as const },
  body: { fontSize: 16, lineHeight: 26, fontWeight: "400" as const },
  bodyStrong: { fontSize: 16, lineHeight: 26, fontWeight: "600" as const },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: "400" as const },
  micro: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600" as const,
    letterSpacing: 1.2,
    textTransform: "uppercase" as const,
  },
};

export const space = {
  gutter: 20,
  section: 24,
  sectionLg: 32,
  cardRadius: 16,
  chipRadius: 12,
  tapMin: 44,
};

export const shadow = {
  card: {
    shadowColor: "#1A1A1A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 3,
  },
};

export const TRUST_LINE =
  "Secure Paystack checkout · Easy returns · Ships across Nigeria";
