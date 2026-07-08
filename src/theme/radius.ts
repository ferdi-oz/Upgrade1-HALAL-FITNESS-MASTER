/**
 * ============================================================
 * HALAL&FITNESS MASTER
 * Theme Border Radius System
 * ============================================================
 */

export const Radius = {
  none: 0,

  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,

  round: 9999,

  button: 12,
  card: 16,
  input: 12,
  chip: 20,
  avatar: 9999,
  modal: 24,
} as const;

export type RadiusName = keyof typeof Radius;

export default Radius;
