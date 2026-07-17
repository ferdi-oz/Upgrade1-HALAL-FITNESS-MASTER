import { getDatabase } from "../database";

export class HistoryRepository {

  async addHistory(

    userId: string,

    productId: string,

    barcode: string,

    productName: string

  ) {

    const db = await getDatabase();

    const id = Date.now().toString();

    await db.runAsync(

      `
      INSERT INTO history
      (
        id,
        userId,
        productId,
        barcode,
        productName,
        createdAt
      )

      VALUES (?, ?, ?, ?, ?, ?)
      `,

      [
        id,
        userId,
        productId,
        barcode,
        productName,
        new Date().toISOString(),
      ]

    );

    return id;

  }

  async getHistory(

    userId: string

  ) {

    const db = await getDatabase();

    return await db.getAllAsync(

      `
      SELECT *

      FROM history

      WHERE userId = ?

      ORDER BY createdAt DESC
      `,

      [userId]

    );

  }

  async getHistoryCount(

    userId: string

  ): Promise<number> {

    const db = await getDatabase();

    const row = await db.getFirstAsync<{ total: number }>(

      `
      SELECT COUNT(*) as total

      FROM history

      WHERE userId = ?
      `,

      [userId]

    );

    return row?.total ?? 0;

  }


  async clearHistory(

    userId: string

  ) {

    const db = await getDatabase();

    await db.runAsync(

      `
      DELETE FROM history

      WHERE userId = ?
      `,

      [userId]

    );

  }

}