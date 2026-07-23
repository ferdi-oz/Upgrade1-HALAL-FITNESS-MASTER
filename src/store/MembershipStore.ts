import AsyncStorage from "@react-native-async-storage/async-storage";

export type MembershipType = "guest" | "individual" | "family";

const STORAGE_KEY = "membership_data";

type MembershipData = {
  type: MembershipType;
  premium: boolean;
};

class MembershipStore {

  private membershipType: MembershipType = "guest";

  private premium = false;


  async load(): Promise<void> {

    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (data) {

      const parsed: MembershipData = JSON.parse(data);

      this.membershipType = parsed.type;
      this.premium = parsed.premium;

    }

  }


  private async save(): Promise<void> {

    const data: MembershipData = {

      type: this.membershipType,

      premium: this.premium,

    };


    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );

  }


  getType(): MembershipType {

    return this.membershipType;

  }


  isPremium(): boolean {

    return this.premium;

  }


  async activateIndividual(): Promise<void> {

    this.membershipType = "individual";

    this.premium = true;

    await this.save();

  }


  async activateFamily(): Promise<void> {

    this.membershipType = "family";

    this.premium = true;

    await this.save();

  }


  async deactivate(): Promise<void> {

    this.membershipType = "guest";

    this.premium = false;

    await this.save();

  }

}


const membershipStore = new MembershipStore();


export default membershipStore;
