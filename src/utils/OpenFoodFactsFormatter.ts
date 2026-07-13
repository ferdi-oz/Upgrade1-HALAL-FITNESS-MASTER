const COUNTRY_MAP: Record<string, string> = {
  finland: "🇫🇮 Finlandiya",
  sweden: "🇸🇪 İsveç",
  norway: "🇳🇴 Norveç",
  denmark: "🇩🇰 Danimarka",
  germany: "🇩🇪 Almanya",
  france: "🇫🇷 Fransa",
  italy: "🇮🇹 İtalya",
  spain: "🇪🇸 İspanya",
  poland: "🇵🇱 Polonya",
  netherlands: "🇳🇱 Hollanda",
  belgium: "🇧🇪 Belçika",
  turkey: "🇹🇷 Türkiye",
  ireland: "🇮🇪 İrlanda",
  austria: "🇦🇹 Avusturya",
  switzerland: "🇨🇭 İsviçre",
  portugal: "🇵🇹 Portekiz",
  greece: "🇬🇷 Yunanistan",
  canada: "🇨🇦 Kanada",
  "united states": "🇺🇸 ABD",
  usa: "🇺🇸 ABD",
  uk: "🇬🇧 Birleşik Krallık",
  england: "🇬🇧 Birleşik Krallık",
  "united kingdom": "🇬🇧 Birleşik Krallık",
};

const CATEGORY_MAP: Record<string, string> = {

  "fruits based foods": "Meyve Bazlı Gıdalar",

  "fruits secs": "Kurutulmuş Meyveler",

  "fruits a coque": "Kabuklu Yemişler",

  "pistaches": "Antep Fıstığı",

  "pistaches grillées": "Kavrulmuş Antep Fıstığı",

  "pistaches salées": "Tuzlu Antep Fıstığı",

  "nuts": "Kuruyemiş",

  "roasted nuts": "Kavrulmuş Kuruyemiş",

  "salted nuts": "Tuzlu Kuruyemiş",

  "snacks": "Atıştırmalık",

  "breakfasts": "Kahvaltılık",

  "cereals": "Tahıllar",

  "biscuits": "Bisküvi",

  "cookies": "Kurabiye",

  "chocolate": "Çikolata",

  "cheese": "Peynir",

  "milk": "Süt",

  "beverages": "İçecek",

  "soft drinks": "Gazlı İçecek",

  "water": "Su",

  "coffee": "Kahve",

  "tea": "Çay",

};

export function formatCountry(country: string): string {

  const key = country
    .toLowerCase()
    .replace(/^en:/, "")
    .replace(/^fr:/, "")
    .replace(/^fi:/, "")
    .replace(/^de:/, "")
    .replace(/-/g, " ")
    .trim();

  return COUNTRY_MAP[key] ?? key;

}

export function formatCategory(category: string): string {

  return category

    .split(",")

    .map((item) =>
      item
        .replace(/^en:/, "")
        .replace(/^fr:/, "")
        .replace(/^fi:/, "")
        .replace(/^de:/, "")
        .replace(/à/g, "a")
        .replace(/-/g, " ")
        .trim()
    )

    .filter(Boolean)

    .map((item) => {

      const lower = item.toLowerCase();

      return CATEGORY_MAP[lower] ?? item;

    })

    .join("\n");

}