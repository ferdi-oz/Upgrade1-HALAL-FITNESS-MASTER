export interface ECode {

  code: string;

  name: string;

  halal: "yes" | "no" | "review" | "unknown";

  healthScore: number;

  risk: "low" | "medium" | "high";

  vegan: boolean;

  description: string;

}