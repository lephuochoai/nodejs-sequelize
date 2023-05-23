import express from 'express';
import { comparePasswordUser, findUser, login, register }
  from '../services/auth.service';
import { BASE_API_URL } from '../constants';
import { authenticateJWT } from '../middleware/permission';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await findUser({ email });

    if (user) {
      return res.status(400).json({
        message: 'User is existed',
      });
    }

    await register({ password, email });
    return res.status(200).send(true);
  } catch (error) {
    return res.status(500).json({
      message: 'Cannot register user',
    });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await findUser({ email });

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    if (!await comparePasswordUser(password, user.password)) {
      return res.status(400).json({
        message: 'Password not match',
      });
    }

    const loginData = await login({ id: user.id });
    return res.status(200).send(loginData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Cannot login user',
    });
  }
});

authRouter.get(
  '/me',
  authenticateJWT,
  (req, res) => {
    console.log(req.user);

    return res.status(200);
    // .json(req.user)
  },
);

export default function initAuthController(app) {
  app.use(`${BASE_API_URL}/auth`, authRouter);
}
