import { User } from '../models';

export const findUserByEmail = async (email: string) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userData: Partial<typeof User> & { email: string }) => {
  try {
    const { email, ...updateData } = userData;
    return await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
}; 