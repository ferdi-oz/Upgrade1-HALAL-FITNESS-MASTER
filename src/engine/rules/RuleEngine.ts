export interface RuleResult {
  score: number;
  reasons: string[];
  warnings: string[];
}

export class RuleEngine {
  analyze(): RuleResult {
    return {
      score: 100,
      reasons: [],
      warnings: [],
    };
  }
}