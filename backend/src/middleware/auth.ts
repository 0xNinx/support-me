import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/AppError';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    walletAddress: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new UnauthorizedError('No token provided'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as {
      id: number;
      walletAddress: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    return next(new UnauthorizedError('Invalid token'));
  }
};

export const generateToken = (userId: number, walletAddress: string): string => {
  return jwt.sign(
    { id: userId, walletAddress },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};
