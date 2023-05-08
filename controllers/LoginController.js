import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function login(req, res) {
  const { email, password } = req.body;
  const secretKey = process.env.secretkey;
  const refreshTokenSecretKey = process.env.refreshTokenSecretKey;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
   
    const isMatch = await bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = jwt.sign({ userId: user._id, password: user.password }, secretKey, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id, password: user.password }, refreshTokenSecretKey);
    res.status(200).json({ user, accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in user' });
  }
};
