import {
  MembershipInfo,
  MembershipType,
  MEMBERSHIP_DEFAULTS,
} from "../models/MembershipType";

export class MembershipManager {

  private membership: MembershipInfo =
    MEMBERSHIP_DEFAULTS.guest;

  getMembership(): MembershipInfo {
    return this.membership;
  }

  login(type: MembershipType) {
    this.membership =
      MEMBERSHIP_DEFAULTS[type];
  }

  logout() {
    this.membership =
      MEMBERSHIP_DEFAULTS.guest;
  }

  setMembership(type: MembershipType) {
    this.membership =
      MEMBERSHIP_DEFAULTS[type];
  }

  isGuest() {
    return this.membership.type === "guest";
  }

  isIndividual() {
    return this.membership.type === "individual";
  }

  isFamily() {
    return this.membership.type === "family";
  }

  isPremium() {
    return this.membership.type === "premium";
  }

  canUseProfiles() {
    return this.membership.canUseProfiles;
  }

  canUseFamily() {
    return this.membership.canUseFamily;
  }

  canUsePremium() {
    return this.membership.canUsePremium;
  }

  remainingGuestScans(
    usedToday: number,
  ) {
    if (!this.isGuest()) {
      return Infinity;
    }

    return Math.max(
      0,
      this.membership.dailyScanLimit -
        usedToday
    );
  }

}