const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // 🔥 sirve archivos

// 🔥 ESTO ARREGLA EL "Cannot GET /"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ===== BASE DE DATOS =====
const DB_FILE = './db.json';

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ===== RUTAS =====
app.get('/data', (req, res) => {
  res.json(readDB());
});

app.post('/caso', (req, res) => {
  const db = readDB();
  db.casos.unshift(req.body);
  writeDB(db);
  res.json({ ok: true });
});

// ===== SERVIDOR =====
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor activo en http://localhost:" + PORT);
});