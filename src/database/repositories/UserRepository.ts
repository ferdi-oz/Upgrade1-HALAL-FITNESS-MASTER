import { getDatabase } from "../database";

export interface CreateUserData {
  username: string;
  email?: string;


  mode: "guest" | "individual" | "family";

  age?: number;
  gender?: string;

  height?: number;
  weight?: number;

  activityLevel?: string;
  goal?: string;

  allergies?: string;
  diseases?: string;

  diet?: string;
}

export class UserRepository {

  async initialize() {
    return await getDatabase();
  }

  async createUser(data: CreateUserData) {

    const db = await getDatabase();

    const id = Date.now().toString();

    await db.runAsync(
      `
      INSERT INTO users
      (
        id,
        username,
        email,
        mode,
        age,
        gender,
        height,
        weight,
        activityLevel,
        goal,
        allergies,
        diseases,
        diet,
        createdAt,
        updatedAt
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,

        data.username,

        data.email ?? "",

        data.mode,

        data.age ?? null,

        data.gender ?? "",

        data.height ?? null,

        data.weight ?? null,

        data.activityLevel ?? "",

        data.goal ?? "",

        data.allergies ?? "",

        data.diseases ?? "",

        data.diet ?? "",

        new Date().toISOString(),

        new Date().toISOString(),
      ]
    );

    return id;
  }

  async getCurrentUser() {

    const db = await getDatabase();

    return await db.getFirstAsync(
      `
      SELECT *
      FROM users
      ORDER BY createdAt DESC
      LIMIT 1
      `
    );
  }

  async deleteUsers() {

    const db = await getDatabase();

    await db.runAsync(`DELETE FROM users`);
  }
}