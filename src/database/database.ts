import * as SQLite from "expo-sqlite";

import { runMigrations } from "./migrations";
import { seedDatabase } from "./seed";

let database: SQLite.SQLiteDatabase | null = null;

export async function getDatabase() {
  if (database) {
    return database;
  }

  database = await SQLite.openDatabaseAsync(
    "halal_fitness_master.db"
  );

  await database.execAsync("PRAGMA journal_mode = WAL;");
  await database.execAsync("PRAGMA foreign_keys = ON;");

  await runMigrations(database);

  await seedDatabase(database);

  return database;
}