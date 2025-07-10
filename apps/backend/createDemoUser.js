// Script para insertar el usuario hardcodeado
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const bcrypt = require('bcrypt');
const db = require('./db');

async function createDemoUser() {
  try {
    // Check if user already exists
    const existingUser = await db.User.findOne({ where: { email: 'user@user.com' } });
    if (existingUser) {
      console.log('Demo user already exists.');
      return;
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash('12345', 10);
    await db.User.create({
      email: 'user@user.com',
      password: hashedPassword
    });
    console.log('Demo user created successfully!');
    console.log('Email: user@user.com');
    console.log('Password: 12345');
  } catch (error) {
    console.error('Error creating demo user:', error);
  } finally {
    await db.sequelize.close();
  }
}

createDemoUser();
