import 'dotenv/config';
import bcrypt from 'bcrypt';
import { sequelize } from '../db.js';
import User from '../models/User.js';

async function ensureDb() {
  try {
    await sequelize.authenticate();
    console.log('DB conectada.');
  } catch (err) {
    console.error('No se pudo conectar a la DB:', err);
    process.exit(1);
  }
}

function validatePassword(p) {
  if (!p || p.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
  if (!/[A-Z]/.test(p)) return 'La contraseña debe incluir al menos una letra mayúscula.';
  return null;
}

async function run() {
  await ensureDb();

  const email = process.env.SUPERADMIN_EMAIL || 'root@local';
  const plain = process.env.SUPERADMIN_PASSWORD || 'Root12345';
  const name = process.env.SUPERADMIN_NAME || 'root';
  const surname = process.env.SUPERADMIN_SURNAME || 'root';
  const birthdate = process.env.SUPERADMIN_BIRTHDATE || null;
  const telephone = process.env.SUPERADMIN_TELEPHONE || null;
  const type = 2; // superadmin

  const pwdErr = validatePassword(plain);
  if (pwdErr) {
    console.error('Contraseña inválida:', pwdErr);
    process.exit(1);
  }

  try {
    // borrar usuario existente (si existe)
    const deleted = await User.destroy({ where: { email } });
    if (deleted) console.log(`Usuario ${email} eliminado (${deleted} row(s)).`);
    else console.log('No había usuario con ese email, se creará uno nuevo.');

    const hashed = await bcrypt.hash(plain, 10);
    await User.create({ name, surname, email, birthdate, telephone, password: hashed, type });
    console.log(`Usuario ${email} creado como superadmin (type=${type}).`);
    process.exit(0);
  } catch (err) {
    console.error('Error ejecutando script:', err);
    process.exit(1);
  }
}

run();