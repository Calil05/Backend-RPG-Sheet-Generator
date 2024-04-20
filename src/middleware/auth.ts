import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv'; 
dotenv.config()

export const SECRET_KEY: any = process.env.SECRET_KEY;

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
   
      if (!token) {
        throw new Error();
      }
   
      const decoded = jwt.verify(token, SECRET_KEY);
      (req as CustomRequest).token = decoded;
   
      next();
    } catch (err) {
      res.status(401).send('Please authenticate');
    }

};

export const adminAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).send({ mensagem: 'Missing authentication token.' });
    }

    const decoded: any = jwt.verify(token, SECRET_KEY);

    if (!decoded.access_level) {
      return res.status(401).send({ mensagem: 'Invalid authentication token.' });
    }

    const role = decoded.access_level;

    if (role === process.env.ADMIN_ACCESS) {
      next();
    } else {
      return res.status(401).send({ mensagem: 'Unauthorized access.' });
    }
  } catch (error) {
    return res.status(401).send({ mensagem: 'Authentication failed.' });
  }
};