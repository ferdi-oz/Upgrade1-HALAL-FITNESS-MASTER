/**
 * ============================================================
 * HALAL&FITNESS MASTER
 * Theme Typography System
 * ============================================================
 * Centralized typography definitions.
 * ============================================================
 */

export const FontFamily = {
  regular: "System",
  medium: "System",
  semibold: "System",
  bold: "System",
} as const;

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  display: 32,
} as const;

export const FontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const LineHeight = {
  xs: 18,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 30,
  xxl: 34,
  display: 42,
} as const;

export const Typography = {
  display: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
    lineHeight: LineHeight.display,
  },

  h1: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    lineHeight: LineHeight.xxl,
  },

  h2: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    lineHeight: LineHeight.xl,
  },

  h3: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    lineHeight: LineHeight.lg,
  },

  bodyLarge: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    lineHeight: LineHeight.md,
  },

  body: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: LineHeight.sm,
  },

  caption: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
    lineHeight: LineHeight.xs,
  },

  button: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    lineHeight: LineHeight.md,
  },
} as const;

export default Typography;
