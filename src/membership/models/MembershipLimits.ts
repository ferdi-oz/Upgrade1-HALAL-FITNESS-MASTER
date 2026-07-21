import { UserRole } from "../../auth/types/UserRole";

export interface MembershipLimit {

  dailyScans: number;

  favorites: boolean;

  history: boolean;

  aiAnalysis: boolean;

  cloudSync: boolean;

  community: boolean;

  ocr: boolean;

}

export const MembershipLimits: Record<UserRole, MembershipLimit> = {

  [UserRole.GUEST]: {

    dailyScans: 5,

    favorites: false,

    history: false,

    aiAnalysis: false,

    cloudSync: false,

    community: false,

    ocr: true,

  },

  [UserRole.MEMBER]: {

    dailyScans: 30,

    favorites: true,

    history: true,

    aiAnalysis: false,

    cloudSync: false,

    community: true,

    ocr: true,

  },

  [UserRole.PREMIUM]: {

    dailyScans: 999999,

    favorites: true,

    history: true,

    aiAnalysis: true,

    cloudSync: true,

    community: true,

    ocr: true,

  },

  [UserRole.FAMILY]: {

    dailyScans: 999999,

    favorites: true,

    history: true,

    aiAnalysis: true,

    cloudSync: true,

    community: true,

    ocr: true,

  },

  [UserRole.PROFESSIONAL]: {

    dailyScans: 999999,

    favorites: true,

    history: true,

    aiAnalysis: true,

    cloudSync: true,

    community: true,

    ocr: true,

  },

  [UserRole.ADMIN]: {

    dailyScans: 999999,

    favorites: true,

    history: true,

    aiAnalysis: true,

    cloudSync: true,

    community: true,

    ocr: true,

  },

};