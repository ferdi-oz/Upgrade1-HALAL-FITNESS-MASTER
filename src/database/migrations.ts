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

    console.log(`➕ ${table}.${column} ekleniyor...`);

    await db.execAsync(
      `ALTER TABLE ${table} ADD COLUMN ${column} ${type};`
    );

    console.log(`✅ ${table}.${column} eklendi.`);
  }
}

export async function runMigrations(
  db: SQLite.SQLiteDatabase
) {

  console.log("📦 Migration başladı");

  // PRODUCTS

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

  // USERS

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (

      id TEXT PRIMARY KEY NOT NULL,

      username TEXT NOT NULL,

      mode TEXT NOT NULL,

      createdAt TEXT NOT NULL

    );
  `);

  // FAMILY MEMBERS

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS family_members (

      id TEXT PRIMARY KEY NOT NULL,

      userId TEXT NOT NULL,

      username TEXT NOT NULL,

      email TEXT,

      age INTEGER,

      gender TEXT,

      height REAL,

      weight REAL,

      allergies TEXT,

      diseases TEXT,

      diet TEXT,

      activityLevel TEXT,

      goal TEXT,

      photo TEXT,

      updatedAt TEXT,

      createdAt TEXT NOT NULL

    );
  `);

  await addColumnIfMissing(
    db,
    "family_members",
    "email",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "family_members",
    "gender",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "family_members",
    "diet",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "family_members",
    "activityLevel",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "family_members",
    "goal",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "family_members",
    "photo",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "family_members",
    "updatedAt",
    "TEXT"
  );


// FAVORITES

await db.execAsync(`
  CREATE TABLE IF NOT EXISTS favorites (

    id TEXT PRIMARY KEY NOT NULL,

    userId TEXT NOT NULL,

    productId TEXT NOT NULL,

    barcode TEXT,

    createdAt TEXT NOT NULL

  );
`);


// HISTORY

await db.execAsync(`
  CREATE TABLE IF NOT EXISTS history (

    id TEXT PRIMARY KEY NOT NULL,

    userId TEXT NOT NULL,

    productId TEXT,

    barcode TEXT,

    productName TEXT,

    createdAt TEXT NOT NULL

  );
`);


  // PRODUCT COLUMNS

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

  // USER COLUMNS

  await addColumnIfMissing(
    db,
    "users",
    "email",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "users",
    "age",
    "INTEGER"
  );

  await addColumnIfMissing(
    db,
    "users",
    "gender",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "users",
    "height",
    "REAL"
  );

  await addColumnIfMissing(
    db,
    "users",
    "weight",
    "REAL"
  );

  await addColumnIfMissing(
    db,
    "users",
    "activityLevel",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "users",
    "goal",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "users",
    "allergies",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "users",
    "diseases",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "users",
    "diet",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "users",
    "photo",
    "TEXT"
  );

  await addColumnIfMissing(
    db,
    "users",
    "updatedAt",
    "TEXT"
  );

  console.log("✅ Migration tamamlandı");
}
