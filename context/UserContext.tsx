import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

export type UserMode =
  | "guest"
  | "individual"
  | "family";

export interface UserProfile {
  id: string;
  username: string;
  mode: UserMode;
}

interface UserContextType {
  user: UserProfile | null;

  isGuest: boolean;

  login: (
    profile: UserProfile
  ) => void;

  logout: () => void;
}

const UserContext =
  createContext<UserContextType | null>(
    null
  );

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] =
    useState<UserProfile | null>(
      null
    );

  const value = useMemo(
    () => ({
      user,

      isGuest: user === null,

      login: (
        profile: UserProfile
      ) => setUser(profile),

      logout: () =>
        setUser(null),
    }),
    [user]
  );

  return (
    <UserContext.Provider
      value={value}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {

  const context =
    useContext(UserContext);

  if (!context) {

    throw new Error(
      "useUser must be used inside UserProvider"
    );

  }

  return context;

}