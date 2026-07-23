export type FamilyMember = {
  id: string;
  name: string;
  email: string;
};

class FamilyStore {
  private members: FamilyMember[] = [];

  getMembers(): FamilyMember[] {
    return this.members;
  }

  addMember(member: FamilyMember): void {
    this.members.push(member);
  }

  removeMember(id: string): void {
    this.members = this.members.filter((m) => m.id !== id);
  }

  clear(): void {
    this.members = [];
  }

  count(): number {
    return this.members.length;
  }
}

const familyStore = new FamilyStore();

export default familyStore;
