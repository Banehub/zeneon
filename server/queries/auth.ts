import bcrypt from 'bcrypt';
import { pool } from '../config/db';
import crypto from 'crypto';

// Define the User interface
interface User {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  address: string;
  activated: boolean;
  activationToken?: string;
}

export const findUserByEmail = async (email: string) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return (rows as any[])[0] || null;
  } finally {
    connection.release();
  }
};

export const registerUser = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  address: string;
}) => {
  const connection = await pool.getConnection();
  try {
    // Check if user exists
    const [existingUsers] = await connection.query(
      'SELECT email FROM users WHERE email = ?',
      [userData.email]
    );
    
    if ((existingUsers as any[]).length > 0) {
      throw new Error('User already registered');
    }

    // Generate activation token
    const activationToken = crypto.randomBytes(32).toString('hex');
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData.password, salt);

    // Insert user
    await connection.query(
      `INSERT INTO users (email, passwordHash, firstName, lastName, contactNumber, address, activated, activationToken)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userData.email,
        passwordHash,
        userData.firstName,
        userData.lastName,
        userData.contactNumber,
        userData.address,
        false,
        activationToken
      ]
    );

    return activationToken;
  } finally {
    connection.release();
  }
};

export const activateUser = async (token: string) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'UPDATE users SET activated = true, activationToken = NULL WHERE activationToken = ?',
      [token]
    );
    return (result as any).affectedRows > 0;
  } finally {
    connection.release();
  }
}; 