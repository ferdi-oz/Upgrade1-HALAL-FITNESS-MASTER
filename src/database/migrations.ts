import * as SQLite from "expo-sqlite";

async function addColumnIfMissing(
  db: SQLite.SQLiteDatabase,
  table: string,
  column: string,
  type: string
) {
  const columns = (await db.getAllAsync(
    `PRAGMA table_info(${table});`
  )) as Array<{ name: string }>;

  const exists = columns.some(
    (c) => c.name === column
  );

  if (!exists) {
    console.log(`➕ ${column} sütunu ekleniyor...`);

    await db.execAsync(
      `ALTER TABLE ${table} ADD COLUMN ${column} ${type};`
    );

    console.log(`✅ ${column} eklendi.`);
  }
}

export async function runMigrations(
  db: SQLite.SQLiteDatabase
) {
  console.log("📦 Migration başladı");

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

  await addColumnIfMissing(
    db,
    "products",
    "nutritionGrade",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "products",
    "novaGroup",
    "INTEGER"
  );

  await addColumnIfMissing(
    db,
    "products",
    "ecoScore",
    "TEXT"
  );

  console.log("✅ Migration tamamlandı");
}