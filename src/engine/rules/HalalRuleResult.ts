export interface HalalRuleResult {

  score: number;

  status:
    | "halal"
    | "review"
    | "haram";

  reasons: string[];

}
