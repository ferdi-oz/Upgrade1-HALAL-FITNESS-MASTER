import * as SQLite from "expo-sqlite";

export async function runMigrations(
  db: SQLite.SQLiteDatabase
) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (

      id TEXT PRIMARY KEY NOT NULL,

      barcode TEXT UNIQUE NOT NULL,

      name TEXT NOT NULL,

      brand TEXT,

      category TEXT,

      imageUrl TEXT,

      ingredients TEXT,

      countries TEXT,

      certifications TEXT,

      createdAt TEXT,

      updatedAt TEXT

    );
  `);
}