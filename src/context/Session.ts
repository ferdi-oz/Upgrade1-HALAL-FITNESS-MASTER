export type MembershipType =
  | "guest"
  | "personal"
  | "family";

export interface SessionUser {

  id: string;

  membership: MembershipType;

  loggedIn: boolean;

}
