import express, { Request, Response, Router, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { findUserByEmail, registerUser, activateUser } from '../queries/auth';
import { Document } from 'mongoose';

interface UserDocument extends Document {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  address: string;
  activated: boolean;
  activationToken?: string;
  toObject(): any;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  address: string;
}

const router: Router = express.Router();

const loginHandler: RequestHandler<{}, {}, LoginRequest> = async (req, res) => {
  const { email, password } = req.body;
  try {   
    const user = await findUserByEmail(email) as UserDocument | null;
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    if (!user.activated) {
      res.status(401).json({ error: 'Account not activated' });
      return;
    }

    const { passwordHash, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ message: 'Login successful', user: userWithoutPassword });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const registerHandler: RequestHandler<{}, {}, RegisterRequest> = async (req, res) => {
  const { email, password, firstName, lastName, contactNumber, address } = req.body;
  try {
    await registerUser({ email, password, firstName, lastName, contactNumber, address });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    if (error.message === 'User already registered') {
      res.status(409).json({ error: 'User already registered' });
      return;
    }
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const activateHandler: RequestHandler<{ token: string }> = async (req, res) => {
  const { token } = req.params;
  try {
    const activated = await activateUser(token);
    if (!activated) {
      res.status(400).json({ error: 'Invalid or expired activation token' });
      return;
    }
    res.status(200).json({ message: 'Account activated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

router.post('/login', loginHandler);
router.post('/register', registerHandler);
router.get('/activate/:token', activateHandler);

export default router; 