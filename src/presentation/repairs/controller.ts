import { Request, Response } from "express"
import { RepairService } from "../services/repairs.service";
import { CreateRepairsDto } from "../../domain/dtos/repairs/create.repairs.dto";
import { UpdateRepairsDto } from "../../domain/dtos/repairs/update.repairs.dto";


export class RepairsController {

    constructor(
        private readonly repairService: RepairService
    ) { }

    createRepair = (req: Request, res: Response) => {
        const [error, createRepairsDto] = CreateRepairsDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        this.repairService.createRepair(createRepairsDto)
        .then(repair => res.status(201).json(repair))
        .catch(err => res.status(500).json(err))

    }

    findAllRepairs = (req: Request, res: Response) => {
        const repairs = this.repairService.findAllRepairs()
            .then(repairs => res.status(200).json(repairs))
            .catch(err => res.status(500).json(err))
    }

    findOneRepair = (req: Request, res: Response) => {
        const { id } = req.params;
        this.repairService.findOneRepair(+id)
            .then(repair => res.status(200).json(repair))
            .catch(err => res.status(500).json(err))
    }

    UpdateRepair = (req: Request, res: Response) => {
        const { id } = req.params;
        const [ error, updateRepairsDto ] = UpdateRepairsDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        this.repairService.updateRepair(+id, updateRepairsDto!)
            .then(repair => res.status(200).json(repair))
            .catch(err => res.status(500).json(err))
    }

    deleteRepair = (req: Request, res: Response) => {
        const { id } = req.params;
        this.repairService.deleteRepair(+id)
            .then(repair => res.status(200).json(repair))
            .catch(err => res.status(500).json(err))
    }

    getAllPendingRepairs = (req: Request, res: Response) => {
        this.repairService.getAllPendingRepairs()
        .then(repairs => res.status(200).json(repairs))
        .catch(err => res.status(500).json(err))
    }

    getPendingRepairById = (req: Request, res: Response) => {
        const { id } = req.params;
        this.repairService.getPendingRepairById(+id)
            .then(repair => res.status(200).json(repair))
            .catch(err => res.status(500).json(err))
    }

    updatePendingRepair = (req: Request, res: Response) => {
        const { id } = req.params;
        const [ error, updateRepairsDto ] = UpdateRepairsDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        this.repairService.updatePendingRepair(+id, updateRepairsDto!)
            .then(repair => res.status(200).json(repair))
            .catch(err => res.status(500).json(err))
    }

    cancelPendingRepair = (req: Request, res: Response) => {
        const { id } = req.params;
        this.repairService.cancelPendingRepair(+id)
            .then(repair => res.status(200).json(repair))
            .catch(err => res.status(500).json(err))
    }
}