export type MembershipType = "guest" | "individual" | "family";

class MembershipStore {
  private membershipType: MembershipType = "guest";
  private premium = false;

  getType(): MembershipType {
    return this.membershipType;
  }

  isPremium(): boolean {
    return this.premium;
  }

  activateIndividual(): void {
    this.membershipType = "individual";
    this.premium = true;
  }

  activateFamily(): void {
    this.membershipType = "family";
    this.premium = true;
  }

  deactivate(): void {
    this.membershipType = "guest";
    this.premium = false;
  }
}

const membershipStore = new MembershipStore();

export default membershipStore;
