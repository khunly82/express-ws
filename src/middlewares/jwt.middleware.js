import jwt from 'jsonwebtoken';

export const JwtMiddleware = (req, res, next) => {

  const token = req.headers.authorization?.replace('Bearer ', '');
  // const token = req.header.Authorization != null ? req.header.Authorization.replace('Bearer ', '') : null;

  if(token) {
    try {
      const {JWT_SECRET} = process.env;
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = { username: payload.username };
    } catch(err) { }
  }

  next();
}