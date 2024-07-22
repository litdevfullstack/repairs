import { Router } from "express";
import { RepairService } from "../services/repairs.service";
import { RepairsController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

enum UserRole {
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
    CLIENT = 'CLIENT'
}

export class EmployeeRepairsRoutes {
    static get routes(): Router {
        const router = Router();
        const repairService = new RepairService();
        const controller = new RepairsController(repairService)

        router.use(AuthMiddleware.protect)
        router.get('/pending', AuthMiddleware.restrictTo(UserRole.EMPLOYEE), controller.getAllPendingRepairs);
        router.get('/pending/:id', AuthMiddleware.restrictTo(UserRole.EMPLOYEE), controller.getPendingRepairById);
        router.patch('/pending/:id', AuthMiddleware.restrictTo(UserRole.EMPLOYEE), controller.updatePendingRepair);
        router.delete('/pending/:id', AuthMiddleware.restrictTo(UserRole.EMPLOYEE), controller.cancelPendingRepair);

        return router;

        }
}    