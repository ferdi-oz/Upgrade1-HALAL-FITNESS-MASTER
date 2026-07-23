import AsyncStorage from "@react-native-async-storage/async-storage";

export type Language = "tr" | "en" | "fi";
export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "app_settings";


type SettingsData = {
  language: Language;
  theme: Theme;
};


class SettingsStore {

  private language: Language = "en";

  private theme: Theme = "system";


  async load(): Promise<void> {

    const data =
      await AsyncStorage.getItem(STORAGE_KEY);


    if (data) {

      const parsed: SettingsData =
        JSON.parse(data);

      this.language = parsed.language;

      this.theme = parsed.theme;

    }

  }


  private async save(): Promise<void> {

    const data: SettingsData = {

      language: this.language,

      theme: this.theme,

    };


    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );

  }


  getLanguage(): Language {

    return this.language;

  }


  async setLanguage(
    language: Language
  ): Promise<void> {

    this.language = language;

    await this.save();

  }


  getTheme(): Theme {

    return this.theme;

  }


  async setTheme(
    theme: Theme
  ): Promise<void> {

    this.theme = theme;

    await this.save();

  }

}


const settingsStore = new SettingsStore();


export default settingsStore;
