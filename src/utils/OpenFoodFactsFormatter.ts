export function formatCountry(country: string): string {
  const value = country
    .replace(/^en:/, "")
    .replace(/^fi:/, "")
    .replace(/^fr:/, "")
    .replace(/^de:/, "")
    .replace(/-/g, " ")
    .toLowerCase();

  const countries: Record<string, string> = {
    finland: "Finland",
    sweden: "Sweden",
    norway: "Norway",
    denmark: "Denmark",
    germany: "Germany",
    france: "France",
    italy: "Italy",
    spain: "Spain",
    poland: "Poland",
    netherlands: "Netherlands",
    belgium: "Belgium",
    turkey: "Türkiye",
    "united kingdom": "United Kingdom",
    ireland: "Ireland",
    austria: "Austria",
    switzerland: "Switzerland",
    portugal: "Portugal",
    greece: "Greece",
    canada: "Canada",
    "united states": "United States",
  };

  return countries[value] ?? value;
}

export function formatCategory(category: string): string {
  return category
    .replace(/en:/g, "")
    .replace(/fr:/g, "")
    .replace(/fi:/g, "")
    .replace(/de:/g, "")
    .replace(/,/g, "\n")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (x) => x.toUpperCase());
}