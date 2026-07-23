import AsyncStorage from "@react-native-async-storage/async-storage";

export type FamilyMember = {
  id: string;
  name: string;
  email: string;
};

const STORAGE_KEY = "family_members";


class FamilyStore {

  private members: FamilyMember[] = [];


  async load(): Promise<void> {

    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (data) {

      this.members = JSON.parse(data);

    }

  }


  private async save(): Promise<void> {

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(this.members)
    );

  }


  getMembers(): FamilyMember[] {

    return this.members;

  }


  async addMember(
    member: FamilyMember
  ): Promise<void> {

    this.members.push(member);

    await this.save();

  }


  async removeMember(
    id: string
  ): Promise<void> {

    this.members =
      this.members.filter(
        (m) => m.id !== id
      );

    await this.save();

  }


  async clear(): Promise<void> {

    this.members = [];

    await this.save();

  }


  count(): number {

    return this.members.length;

  }

}


const familyStore = new FamilyStore();


export default familyStore;
