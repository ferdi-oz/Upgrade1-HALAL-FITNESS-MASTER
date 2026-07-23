export type HealthProfile =
  | "standard"
  | "pregnant"
  | "athlete"
  | "diabetes"
  | "vegan"
  | "child"
  | "elderly";

export interface FamilyMember {
  id: string;

  firstName: string;

  lastName: string;

  age: number;

  gender: "male" | "female";

  profile: HealthProfile;

  allergies: string[];

  diseases: string[];

  createdAt: string;

  updatedAt: string;
}