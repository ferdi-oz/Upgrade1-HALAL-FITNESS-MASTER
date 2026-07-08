import { HalalStatus } from "../valueObjects/HalalStatus";
import { Madhhab } from "../valueObjects/Madhhab";

export interface MadhhabResult {
  madhhab: Madhhab;

  status: HalalStatus;

  reason: string;

  evidence: string[];

  confidence: number;
}