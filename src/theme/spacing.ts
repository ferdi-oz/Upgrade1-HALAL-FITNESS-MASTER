/**
 * ============================================================
 * HALAL&FITNESS MASTER
 * Theme Spacing System
 * ============================================================
 */

export const Spacing = {
  none: 0,

  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,

  xxxl: 32,
  huge: 40,
  giant: 48,

  screenHorizontal: 20,
  screenVertical: 20,

  cardPadding: 16,
  buttonPadding: 16,
  inputPadding: 14,

  sectionSpacing: 24,
  itemSpacing: 12,
} as const;

export type SpacingName = keyof typeof Spacing;

export default Spacing;
