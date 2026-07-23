import { FamilyMember } from "./FamilyMember";

export default class FamilyManager {
  private members: FamilyMember[] = [];

  getMembers() {
    return this.members;
  }

  add(member: FamilyMember) {
    this.members.push(member);
  }

  update(member: FamilyMember) {
    this.members = this.members.map((m) =>
      m.id === member.id ? member : m
    );
  }

  remove(id: string) {
    this.members = this.members.filter(
      (m) => m.id !== id
    );
  }

  clear() {
    this.members = [];
  }
}