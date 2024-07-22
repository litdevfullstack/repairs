import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";


enum UserRole {
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
    CLIENT = 'CLIENT'
}

export class UsersRoutes {
    static get routes(): Router {
        const router = Router();
        const userService = new UserService();
        const authService = new AuthService();
        const controller = new UserController(userService, authService);

        
        router.post('/login', controller.login);
        router.post('/',controller.createUser);
        router.use(AuthMiddleware.protect)
        router.get('/', AuthMiddleware.restrictTo(UserRole.ADMIN), controller.findAllUsers);
        router.get('/:id', AuthMiddleware.restrictTo(UserRole.ADMIN), controller.findOneUser);
        router.patch('/:id', AuthMiddleware.restrictTo(UserRole.ADMIN), controller.UpdateUser);
        router.delete('/:id', AuthMiddleware.restrictTo(UserRole.ADMIN), controller.deleteUser)

        return router;
    }
}