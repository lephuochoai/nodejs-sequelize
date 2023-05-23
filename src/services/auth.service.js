import jwt from 'jsonwebtoken';
import db from '../db';
import { REFRESH_TOKEN_EXPIRED, TOKEN_EXPIRED } from '../constants';

export async function findUser({ email }) {
  try {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });

    return user.toJSON();
  } catch (e) {
    // Log
    console.log(e);
    return null;
  }
}

function getUserToken(userInfo) {
  try {
    const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
      expiresIn: TOKEN_EXPIRED,
    });

    const refreshToken = jwt.sign(userInfo, process.env.JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRED,
    });

    return { token, refreshToken };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function comparePasswordUser(password, hashPassword) {
  return db.User.comparePassword(password, hashPassword);
}

export async function register({ password, email }) {
  try {
    const transaction = await db.sequelize.transaction();
    const user = await db.User.create({
      email,
      password: db.User.hashPassword(password),
      status: 'active',
    });
    await transaction.commit();
    const result = { ...user };
    delete result.password;
    return result;
  } catch (e) {
    // Log
    console.log(e);
    throw e;
  }
}

export async function login(userInfo) {
  try {
    return getUserToken(userInfo);
  } catch (e) {
    // Log
    console.log(e);
    throw e;
  }
}
