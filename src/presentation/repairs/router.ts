import { Router } from "express";
import { RepairsController } from "./controller";
import { RepairService } from "../services/repairs.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

enum UserRole {
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
    CLIENT = 'CLIENT'
}

export class RepairssRoutes {
    static get routes(): Router {
        const router = Router();
        const repairService = new RepairService();
        const controller = new RepairsController(repairService)

        router.use(AuthMiddleware.protect)
        router.get('/', AuthMiddleware.restrictTo(UserRole.EMPLOYEE), controller.findAllRepairs);
        router.post('/', AuthMiddleware.restrictTo(UserRole.EMPLOYEE), controller.createRepair);
        router.get('/:id', AuthMiddleware.restrictTo(UserRole.EMPLOYEE), controller.findOneRepair);
        router.patch('/:id', AuthMiddleware.restrictTo(UserRole.EMPLOYEE), controller.UpdateRepair);
        router.delete('/:id', AuthMiddleware.restrictTo(UserRole.EMPLOYEE), controller.deleteRepair);

        return router;
    }
}