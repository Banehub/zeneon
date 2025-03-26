import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Environment variables with validation
const requiredEnvVars = [
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_DATABASE',
  'PORT',
  'EMAIL_USER',
  'EMAIL_PASS',
  'BASE_URL',
  'NODE_ENV'
] as const;

// Check for required environment variables
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    uri: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`
  },
  server: {
    port: parseInt(process.env.PORT || '3011', 10),
    baseUrl: process.env.BASE_URL,
    nodeEnv: process.env.NODE_ENV
  },
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS
  }
} as const; 