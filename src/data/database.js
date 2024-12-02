import sqlite3 from 'sqlite3';
import { hashPassword } from './authUtils.js';

const db = new sqlite3.Database('./src/data/products.db', (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error al crear la tabla users:', err.message);
      }
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        image TEXT,
        category TEXT,
        stock INTEGER,
        storeType TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error al crear la tabla products:', err.message);
      }
    });

    // Crear usuario root fijo
    hashPassword('rootpassword').then((hashedPassword) => {
      db.run(`
        INSERT OR IGNORE INTO users (username, password)
        VALUES ('root', ?)
      `, [hashedPassword], (err) => {
        if (err) {
          console.error('Error al insertar el usuario root:', err.message);
        } else {
          console.log('Usuario root insertado correctamente.');
        }
      });
    });
  }
});

export default db;
