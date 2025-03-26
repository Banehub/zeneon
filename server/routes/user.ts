import express, { Request, Response, Router, RequestHandler } from 'express';
import { findUserByEmail, updateUser } from '../queries/user';

interface UserUpdateRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  address?: string;
}

const router: Router = express.Router();

const fetchUser: RequestHandler<{ email: string }> = async (req, res) => {
  try {
    const user = await findUserByEmail(req.params.email);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    if (!user.activated) {
      res.status(403).json({ message: 'Account not activated' });
      return;
    }
    const userObject = user.toObject();
    delete userObject.passwordHash;
    res.json(userObject);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUserHandler: RequestHandler<{}, {}, UserUpdateRequest> = async (req, res) => {
  try {
    const updatedUser = await updateUser(req.body);
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const userObject = updatedUser.toObject();
    delete userObject.passwordHash;
    res.json(userObject);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

router.get('/fetch/:email', fetchUser);
router.post('/update', updateUserHandler);

export default router; 