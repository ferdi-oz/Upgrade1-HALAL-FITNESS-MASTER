import { UserProfile } from "./UserProfile";

export interface FamilyProfile {

  id: string;

  familyName: string;

  members: UserProfile[];

}