export const DAILY_SCAN_LIMIT = 5;

class GuestStore {
  private scansToday = 0;

  getScansToday(): number {
    return this.scansToday;
  }

  getRemainingScans(): number {
    return Math.max(0, DAILY_SCAN_LIMIT - this.scansToday);
  }

  canScan(): boolean {
    return this.scansToday < DAILY_SCAN_LIMIT;
  }

  addScan(): void {
    if (this.canScan()) {
      this.scansToday++;
    }
  }

  resetDailyScans(): void {
    this.scansToday = 0;
  }
}

const guestStore = new GuestStore();

export default guestStore;