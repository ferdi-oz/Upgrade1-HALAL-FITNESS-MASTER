import { getDatabase } from "../database";

export class FamilyRepository {

  async addMember(
    userId: string,
    username: string,
    age: number,
    height: number,
    weight: number,
    allergies: string,
    diseases: string
  ) {

    const db = await getDatabase();

    const id = Date.now().toString();

    await db.runAsync(

      `INSERT INTO family_members
      (
        id,
        userId,
        username,
        age,
        height,
        weight,
        allergies,
        diseases,
        createdAt
      )

      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,

      [
        id,
        userId,
        username,
        age,
        height,
        weight,
        allergies,
        diseases,
        new Date().toISOString(),
      ]

    );

    return id;

  }

}