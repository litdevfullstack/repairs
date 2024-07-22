import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config/jwt.adapter';
import { User } from '../../data/postgres/models/user.models';
import { CustomError } from '../../domain';

enum UserStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED'
}

enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  CLIENT = 'CLIENT'
}

export class AuthMiddleware {

  static async protect(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({ message: 'No token provided' });
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({ message: 'Invalid token' });

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.validateToken<{ id: number }>(token);
      if (!payload) return res.status(401).json({ message: 'Invalid token' })

      const user = await User.findOne({
        where: {
          id: payload.id,
          userStatus: UserStatus.ACTIVE,
        }
      })
      if (!user) return res.status(401).json({ message: 'Invalid user' });


      req.body.sessionUser = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Something went very wrong! 🧨' })
    }

  }

  static restrictTo = (...roles: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.body.sessionUser.rol)) {
        return res.status(403).json({ message: 'You are not authorized to access this route' })
      }
      next();
    }
  }

  static isUserOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userIdFromToken = req.body.sessionUser.id; 
      const userIdFromParams = parseInt(req.params.id, 10); 

      if (userIdFromToken !== userIdFromParams) {
        throw CustomError.notFound("User not found");
      }

      next();
    } catch (error) {
      next(error); 
    }
  }
}


