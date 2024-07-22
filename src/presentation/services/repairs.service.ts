import { Repairs } from "../../data"
import { CustomError } from "../../domain"
import { CreateRepairsDto } from "../../domain/dtos/repairs/create.repairs.dto"
import { UpdateRepairsDto } from "../../domain/dtos/repairs/update.repairs.dto"

enum RepairsStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export class RepairService {
    
    constructor(){
        
    }
    
    async createRepair(repairData: CreateRepairsDto) {
        const newRepair = new Repairs()

        newRepair.date = repairData.date
        newRepair.user_id = repairData.userId
        newRepair.motorsNumber = repairData.motorsNumber
        newRepair.description = repairData.description
        
        try {
            const result = await newRepair.save()
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async findAllRepairs() {
        try {
            const result = await Repairs.find({
                where: {
                    status: RepairsStatus.PENDING
                }
            })
            return result
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong" );
        }
    }
    
    async findOneRepair(id: number) {
        try {
            const result = await Repairs.findOne({ where: { id } })
            return result
        } catch (error) {
            throw CustomError.notFound("Repair not found");
        }
    }

    async updateRepair(id: number, repair: UpdateRepairsDto) {
        const updatedRepair = await this.findOneRepair(id)
        updatedRepair.date = repair.date
        updatedRepair.status = repair.status
        updatedRepair.user_id = repair.userId
        try {
            const result = await updatedRepair.save()
            return result
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong" );
        }
    }

    async deleteRepair(id: number) {
        const repair = await this.findOneRepair(id)

        repair.status = RepairsStatus.CANCELLED

        try {
            await repair.save()
            return ("Repair completed")
        } catch (error) {    
            throw CustomError.internalServer("Something went very wrong" );
        }
    }

    async getAllPendingRepairs() {
        try {
            const result = await Repairs.find({
                where: {
                    status: RepairsStatus.PENDING
                }
            })
            return result
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong" );
        }
    }

    async getPendingRepairById(id: number) {
        try {
            const result = await Repairs.findOne({ where: { id } })
            if (!result || result.status !== RepairsStatus.PENDING) {
              throw CustomError.notFound("Repair not found or not pending");
            }
            return result
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong" );
        }
    }

    async updatePendingRepair(id: number, repair: UpdateRepairsDto) {
        const updatedRepair = await this.getPendingRepairById(id)
        updatedRepair.status = repair.status
        try {
            const result = await updatedRepair.save()
            return result
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong" );
        }
    }

    async cancelPendingRepair(id: number) {
        const repair = await this.getPendingRepairById(id)

        repair.status = RepairsStatus.CANCELLED

        try {
            await repair.save()
            return ("Repair cancelled")
        } catch (error) {    
            throw CustomError.internalServer("Something went very wrong" );
        }
    }
}
