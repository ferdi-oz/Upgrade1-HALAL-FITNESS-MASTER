import { HealthProfile } from "./HealthProfile";

export type MembershipType =
  | "guest"
  | "personal"
  | "family";

export type Gender =
  | "male"
  | "female"
  | "other";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export type Goal =
  | "maintain"
  | "lose_weight"
  | "gain_weight"
  | "gain_muscle";

export interface UserProfile {

  id: string;

  membership: MembershipType;

  firstName: string;

  lastName: string;

  birthDate: string;

  gender: Gender;

  country: string;

  language: string;

  height: number;

  weight: number;

  activityLevel: ActivityLevel;

  goal: Goal;

  health: HealthProfile;

}