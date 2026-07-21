import { UserProfile } from "../../auth/types/UserProfile";
import { UserRole } from "../../auth/types/UserRole";
import { MembershipLimits } from "../models/MembershipLimits";

export class MembershipEngine {

  static getLimits(user: UserProfile) {
    return MembershipLimits[user.role];
  }

  static canScan(user: UserProfile) {
    return true;
  }

  static canUseOCR(user: UserProfile) {
    return this.getLimits(user).ocr;
  }

  static canUseAI(user: UserProfile) {
    return this.getLimits(user).aiAnalysis;
  }

  static canUseCommunity(user: UserProfile) {
    return this.getLimits(user).community;
  }

  static canUseCloud(user: UserProfile) {
    return this.getLimits(user).cloudSync;
  }

  static canUseFavorites(user: UserProfile) {
    return this.getLimits(user).favorites;
  }

  static canUseHistory(user: UserProfile) {
    return this.getLimits(user).history;
  }

  static getDailyLimit(user: UserProfile) {
    return this.getLimits(user).dailyScans;
  }

  static isGuest(user: UserProfile) {
    return user.role === UserRole.GUEST;
  }

  static isPremium(user: UserProfile) {
    return (
      user.role === UserRole.PREMIUM ||
      user.role === UserRole.FAMILY ||
      user.role === UserRole.PROFESSIONAL ||
      user.role === UserRole.ADMIN
    );
  }

}