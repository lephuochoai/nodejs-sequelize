import passport from 'passport';
import passportJWT from 'passport-jwt';
import db from '../db';

const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const jwtStrategy = new JwtStrategy(options, async (jwtPayload, cb) => {
  const { id } = jwtPayload;

  // Check if user exists in database
  try {
    const user = await db.User.findByPk(id);
    if (user) return cb(null, user);
    return cb(null, false);
  } catch (error) {
    return cb(error, false);
  }
});

passport.use(jwtStrategy);

export const passportJWTAuthenticate = (cb) => passport.authenticate('jwt', {
  session: false,
}, cb);

export function authenticateJWT(req, res, next) {
  return passportJWTAuthenticate((err, user, jwtExpired) => {
    if (jwtExpired) {
      return res.status(401).json({
        message: 'Token has expired',
      });
    }

    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user;
    return next();
  })(req, res, next);
}
