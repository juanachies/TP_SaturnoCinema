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

async function findByEmail(email) {
  return await User.findOne({ where: { email } });
}

async function run() {
  await ensureDb();

  const email = process.env.SUPERADMIN_EMAIL || 'root@local';
  const plain = process.env.SUPERADMIN_PASSWORD || 'root1234';
  const name = process.env.SUPERADMIN_NAME || 'root';
  const surname = process.env.SUPERADMIN_SURNAME || 'root';
  const birthdate = process.env.SUPERADMIN_BIRTHDATE || null;
  const telephone = process.env.SUPERADMIN_TELEPHONE || null;
  const type = 2; // superadmin

  const hashed = await bcrypt.hash(plain, 10);

  const existing = await findByEmail(email);
  if (existing) {
    console.log('Usuario existente. Actualizando permisos y contraseña...');
    await existing.update({ name, surname, birthdate, telephone, password: hashed, type });
    console.log(`Usuario ${email} actualizado a tipo=${type}.`);
  } else {
    console.log('Creando usuario superadmin...');
    await User.create({ name, surname, email, birthdate, telephone, password: hashed, type });
    console.log(`Usuario ${email} creado (type=${type}).`);
  }

  process.exit(0);
}

run().catch((err) => {
  console.error('Error en script:', err);
  process.exit(1);
});