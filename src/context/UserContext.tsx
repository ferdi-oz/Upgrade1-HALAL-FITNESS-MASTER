import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";


import { UserRepository } from "../database/repositories/UserRepository";


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


  logout: () => Promise<void>;


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

const repository = useMemo(
  () => new UserRepository(),
  []
);


useEffect(() => {

  async function loadUser() {

    const savedUser =
      await repository.getCurrentUser();

    if (savedUser) {

      setUser(savedUser as UserProfile);

    }

  }

  loadUser();

}, []);

  const value = useMemo(



    () => ({
      user,

      isGuest: user === null,

      login: (
        profile: UserProfile
      ) => setUser(profile),


      logout: async () => {

  await repository.deleteUsers();

  setUser(null);

},



    }),
[user, repository]
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