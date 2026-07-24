export interface FamilyMember {
  id: string;

  userId: string;

  username: string;

  email?: string | null;

  age?: number | null;

  gender?: string | null;

  height?: number | null;

  weight?: number | null;

  allergies?: string | null;

  diseases?: string | null;

  diet?: string | null;

  activityLevel?: string | null;

  goal?: string | null;

  photo?: string | null;

  createdAt: string;

  updatedAt?: string | null;
}
