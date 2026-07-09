import * as SQLite from "expo-sqlite";

let database: SQLite.SQLiteDatabase | null = null;

export async function getDatabase() {
  if (database) {
    return database;
  }

  database = await SQLite.openDatabaseAsync("halal_fitness_master.db");

  return database;
}