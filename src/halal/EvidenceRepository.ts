import evidence from "./rules/evidence.json";

export interface Evidence {

  status: string;

  reasonKey?: string;

  quran?: string[];

  hadith?: string[];

}

export class EvidenceRepository {

  static get(key: string): Evidence | null {

    const item =
      (evidence as Record<string, Evidence>)[key.toLowerCase()];

    return item ?? null;

  }

}
