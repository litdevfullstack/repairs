import { Router } from "express";
import { RepairssRoutes } from "./repairs/router";
import { UsersRoutes } from "./users/router";
import { EmployeeRepairsRoutes } from "./repairs/router.employee";	
import { AccountRoutes } from "./users/router.account";


export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/v1/users', UsersRoutes.routes);
        router.use('/api/v1/users', AccountRoutes.routes); 
        router.use('/api/v1/repairs', RepairssRoutes.routes);
        router.use('/api/v1/repairs/employee', EmployeeRepairsRoutes.routes);

        return router;
    }
}