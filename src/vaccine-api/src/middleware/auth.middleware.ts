import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const verifyToken = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token missing' });

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Access denied' });
      }
      req.body.auth = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};