import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { hashPassword, verifyPassword } from './authUtils.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite3.Database(path.join(__dirname, '../data/products.db'), (err) => {
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
        imageType TEXT,
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

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      res.status(500).send('Error al obtener productos');
    } else {
      res.json(rows);
    }
  });
});

app.post('/products', (req, res) => {
  const { id, name, description, price, image, imageType, category, stock, storeType } = req.body;
  db.run(
    `INSERT INTO products (id, name, description, price, image, imageType, category, stock, storeType)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, name, description, price, image, imageType, category, stock, storeType],
    (err) => {
      if (err) {
        res.status(500).send('Error al agregar el producto');
      } else {
        res.send('Producto agregado correctamente');
      }
    }
  );
});

app.get('/products/:storeType', (req, res) => {
  const { storeType } = req.params;
  db.all('SELECT * FROM products WHERE storeType = ?', [storeType], (err, rows) => {
    if (err) {
      res.status(500).send('Error al obtener productos');
    } else {
      res.json(rows);
    }
  });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
    if (err) {
      res.status(500).send('Error al obtener usuario');
    } else if (row && await verifyPassword(password, row.password)) {
      res.send('Login exitoso');
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  });
});

app.post('/change-password', async (req, res) => {
  const { newPassword } = req.body;
  const hashedPassword = await hashPassword(newPassword);
  db.run(`UPDATE users SET password = ? WHERE username = 'admin'`, [hashedPassword], (err) => {
    if (err) {
      res.status(500).send('Error al cambiar la contraseña');
    } else {
      res.send('Contraseña cambiada con éxito');
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
