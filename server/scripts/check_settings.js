import db from '../config/db.js';

async function check() {
  try {
    const [cols] = await db.execute('DESCRIBE settings');
    console.log('COLS:', cols.map(c => `${c.Field} (${c.Type})`));
    const [rows] = await db.execute('SELECT key_name, value FROM settings');
    console.log('SETTINGS COUNT:', rows.length);
    console.log('SETTINGS:', rows);
  } catch (err) {
    console.error('Error:', err.message);
  }
  process.exit(0);
}

check();
