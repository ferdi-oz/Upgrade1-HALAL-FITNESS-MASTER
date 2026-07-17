import { getDatabase } from "../database";

export class FavoriteRepository {

  async addFavorite(

    userId: string,

    productId: string,

    barcode: string

  ) {

    const db = await getDatabase();

    const id = Date.now().toString();

    await db.runAsync(

      `
      INSERT INTO favorites
      (
        id,
        userId,
        productId,
        barcode,
        createdAt
      )

      VALUES (?, ?, ?, ?, ?)
      `,

      [
        id,
        userId,
        productId,
        barcode,
        new Date().toISOString(),
      ]

    );

    return id;

  }


  async removeFavorite(

    userId: string,

    productId: string

  ) {

    const db = await getDatabase();

    await db.runAsync(

      `
      DELETE FROM favorites

      WHERE userId = ?

      AND productId = ?
      `,

      [
        userId,
        productId,
      ]

    );

  }

  async isFavorite(

    userId: string,

    productId: string

  ): Promise<boolean> {

    const db = await getDatabase();

    const row = await db.getFirstAsync(

      `
      SELECT id

      FROM favorites

      WHERE userId = ?

      AND productId = ?

      LIMIT 1
      `,

      [
        userId,
        productId,
      ]

    );

    return row !== null;

  }


  async getFavoriteCount(

    userId: string

  ): Promise<number> {

    const db = await getDatabase();

    const row = await db.getFirstAsync<{ total: number }>(

      `
      SELECT COUNT(*) as total

      FROM favorites

      WHERE userId = ?
      `,

      [userId]

    );

    return row?.total ?? 0;

  }

  async getFavorites(

    userId: string

  ) {

    const db = await getDatabase();

    return await db.getAllAsync(

      `
      SELECT *

      FROM favorites

      WHERE userId = ?

      ORDER BY createdAt DESC
      `,

      [userId]

    );

  }

}

