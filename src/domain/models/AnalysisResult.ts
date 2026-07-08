import { HalalStatus } from "../valueObjects/HalalStatus";

export interface AnalysisResult {
  status: HalalStatus;

  confidence: number;

  summary: string;

  evidence: string[];

  warnings: string[];
}