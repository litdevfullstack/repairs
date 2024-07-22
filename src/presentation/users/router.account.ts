import { Router } from "express";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { UserController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AccountRoutes {
 static get routes(): Router {
  const router = Router();
        const userService = new UserService();
        const authService = new AuthService();
        const controller = new UserController(userService, authService);

        
        router.use(AuthMiddleware.protect)
        router.patch('/update/:id', AuthMiddleware.isUserOwner, controller.updateAccount);
        router.delete('/delete/:id', AuthMiddleware.isUserOwner, controller.deleteAccount);

        return router;    
  }
}
