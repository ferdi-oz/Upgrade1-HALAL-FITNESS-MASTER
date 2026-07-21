import { UserRole } from "./UserRole";
import { UserPlan } from "./UserPlan";

export interface UserProfile {
  id: string;

  email?: string;

  displayName?: string;

  photoURL?: string;

  role: UserRole;

  plan: UserPlan;

  guest: boolean;

  verified: boolean;

  createdAt: number;

  lastLogin: number;
}