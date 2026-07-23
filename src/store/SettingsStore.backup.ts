export type Language = "tr" | "en" | "fi";
export type Theme = "light" | "dark" | "system";

class SettingsStore {
  private language: Language = "en";
  private theme: Theme = "system";

  getLanguage(): Language {
    return this.language;
  }

  setLanguage(language: Language): void {
    this.language = language;
  }

  getTheme(): Theme {
    return this.theme;
  }

  setTheme(theme: Theme): void {
    this.theme = theme;
  }
}

const settingsStore = new SettingsStore();

export default settingsStore;
