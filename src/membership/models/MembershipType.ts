export type MembershipType =
  | "guest"
  | "individual"
  | "family"
  | "premium";

export interface MembershipInfo {
  type: MembershipType;

  loggedIn: boolean;

  displayName: string;

  dailyScanLimit: number;

  unlimitedScans: boolean;

  canUseProfiles: boolean;

  canUseFamily: boolean;

  canUsePremium: boolean;
}

export const MEMBERSHIP_DEFAULTS: Record<
  MembershipType,
  MembershipInfo
> = {

  guest: {
    type: "guest",
    loggedIn: false,
    displayName: "Guest",
    dailyScanLimit: 5,
    unlimitedScans: false,
    canUseProfiles: false,
    canUseFamily: false,
    canUsePremium: false,
  },

  individual: {
    type: "individual",
    loggedIn: true,
    displayName: "Member",
    dailyScanLimit: 0,
    unlimitedScans: true,
    canUseProfiles: true,
    canUseFamily: false,
    canUsePremium: false,
  },

  family: {
    type: "family",
    loggedIn: true,
    displayName: "Family",
    dailyScanLimit: 0,
    unlimitedScans: true,
    canUseProfiles: true,
    canUseFamily: true,
    canUsePremium: false,
  },

  premium: {
    type: "premium",
    loggedIn: true,
    displayName: "Premium",
    dailyScanLimit: 0,
    unlimitedScans: true,
    canUseProfiles: true,
    canUseFamily: true,
    canUsePremium: true,
  },

};