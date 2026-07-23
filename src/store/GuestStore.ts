import AsyncStorage from "@react-native-async-storage/async-storage";

export const DAILY_SCAN_LIMIT = 5;

const STORAGE_KEY = "guest_scan_data";

class GuestStore {

  private scansToday = 0;


  async load(): Promise<void> {

    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (data) {

      const parsed = JSON.parse(data);

      this.scansToday = parsed.scansToday ?? 0;

    }

  }


  private async save(): Promise<void> {

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        scansToday: this.scansToday,
      })
    );

  }


  getScansToday(): number {

    return this.scansToday;

  }


  getRemainingScans(): number {

    return Math.max(
      0,
      DAILY_SCAN_LIMIT - this.scansToday
    );

  }


  canScan(): boolean {

    return this.scansToday < DAILY_SCAN_LIMIT;

  }


  async addScan(): Promise<void> {

    if (this.canScan()) {

      this.scansToday++;

      await this.save();

    }

  }


  async resetDailyScans(): Promise<void> {

    this.scansToday = 0;

    await this.save();

  }

}


const guestStore = new GuestStore();


export default guestStore;
