import { getDatabase } from "../database";
import { FamilyMember } from "../../types/FamilyMember";

export class FamilyRepository {

  async initialize() {
    return await getDatabase();
  }

  async addMember(member: FamilyMember) {

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
        member.age,
        member.height,
        member.weight,
        member.allergies,
        member.diseases,
        member.createdAt

      ]

    );

  }


  async getMembers(userId: string) {

    const db = await getDatabase();

    const members =
      await db.getAllAsync(

        `SELECT *
         FROM family_members
         WHERE userId = ?
         ORDER BY username COLLATE NOCASE ASC`,

        [userId]

      );

    return members as FamilyMember[];

  }

  async getMemberById(id: string) {

    const db = await getDatabase();

    const member =
      await db.getFirstAsync(

        `SELECT *
         FROM family_members
         WHERE id = ?`,

        [id]

      );

    return member as FamilyMember | null;

  }

  async updateMember(member: FamilyMember) {

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
        member.age,
        member.height,
        member.weight,
        member.allergies,
        member.diseases,

        member.id

      ]

    );

  }


  async deleteMember(id: string) {

    const db = await getDatabase();

    await db.runAsync(

      `DELETE FROM family_members
       WHERE id = ?`,

      [id]

    );

  }

  async clearMembers(userId: string) {

    const db = await getDatabase();

    await db.runAsync(

      `DELETE FROM family_members
       WHERE userId = ?`,

      [userId]

    );

  }

}

