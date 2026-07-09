import { getDatabase } from "./database";

export async function runMigrations() {
  const db = await getDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      barcode TEXT UNIQUE NOT NULL,

      name TEXT NOT NULL,

      brand TEXT,

      ingredients TEXT,

      energy REAL,

      protein REAL,

      carbohydrate REAL,

      sugar REAL,

      fat REAL,

      saturatedFat REAL,

      fiber REAL,

      salt REAL,

      sodium REAL,

      halalStatus TEXT,

      vegan INTEGER,

      vegetarian INTEGER,

      createdAt TEXT

    );
  `);
}