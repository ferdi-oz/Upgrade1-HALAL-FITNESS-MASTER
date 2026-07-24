import { getDatabase } from "../database";
import type { FamilyMember } from "../../types/FamilyMember";

export class FamilyRepository {

  async initialize() {
    return await getDatabase();
  }

  async addMember(member: FamilyMember): Promise<void> {

    const db = await getDatabase();

    await db.runAsync(

      `INSERT INTO family_members (

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

        member.id,
        member.userId,
        member.username,
        member.age ?? null,
        member.height ?? null,
        member.weight ?? null,
        member.allergies ?? null,
        member.diseases ?? null,
        member.createdAt

      ]

    );

  }


  async getMembers(userId: string): Promise<FamilyMember[]> {

    const db = await getDatabase();

    const members =
      await db.getAllAsync<FamilyMember>(

        `SELECT *
         FROM family_members
         WHERE userId = ?
         ORDER BY username COLLATE NOCASE ASC`,

        [userId]

      );

    return members;

  }

  async getMemberById(id: string): Promise<FamilyMember | null> {

    const db = await getDatabase();

    const member =
      await db.getFirstAsync<FamilyMember>(

        `SELECT *
         FROM family_members
         WHERE id = ?`,

        [id]

      );

    return member;

  }

  async updateMember(member: FamilyMember): Promise<void> {

    const db = await getDatabase();

    await db.runAsync(

      `UPDATE family_members
       SET

         username = ?,
         age = ?,
         height = ?,
         weight = ?,
         allergies = ?,
         diseases = ?

       WHERE id = ?`,

      [

        member.username,
        member.age ?? null,
        member.height ?? null,
        member.weight ?? null,
        member.allergies ?? null,
        member.diseases ?? null,

        member.id

      ]

    );

  }


  async deleteMember(id: string): Promise<void> {

    const db = await getDatabase();

    await db.runAsync(

      `DELETE FROM family_members
       WHERE id = ?`,

      [id]

    );

  }

  async clearMembers(userId: string): Promise<void> {

    const db = await getDatabase();

    await db.runAsync(

      `DELETE FROM family_members
       WHERE userId = ?`,

      [userId]

    );

  }

}

