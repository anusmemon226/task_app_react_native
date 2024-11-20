import React from "react";
import { Stack } from "expo-router";
import "../global.css";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";

const RootLayout = () => {
  return (
    <SQLiteProvider databaseName="taskApp.db" onInit={initializeDB}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="screens/list" />
      </Stack>
    </SQLiteProvider>
  );
};
async function initializeDB(db: SQLiteDatabase) {
  await db.execAsync("drop table category");
  await db.execAsync(
    `PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS category (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, 
    category_name TEXT NOT NULL
    );`
  );
  await db.execAsync(
    `PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, 
    value TEXT NOT NULL,
    category INT NOT NULL,
    status INT NOT NULL DEFAULT 0,
    date TEXT NOT NULL
    );`
  );
  await db.runAsync(
    `INSERT INTO category (category_name) VALUES ('Meeting'),('Deadline'),('Report'),('Appointment'),('Homework'),('Research'),('Exam preparation'),('Doctor appointment'),('Reading'),('Birthday'),('Meetup')`
  );
}

export default RootLayout;
