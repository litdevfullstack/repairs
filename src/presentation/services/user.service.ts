import { User } from "../../data";
import { CustomError } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UpdateAccountUserDto } from "../../domain/dtos/auth/update.account.dto";
import { UpdateUserDto } from "../../domain/dtos/auth/update.user.dto";

enum UserStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED'
}

export class UserService {
    
    constructor(){
        
    }
    
    async createUser(user: RegisterUserDto) {
        const newUser = new User();

        newUser.firstName = user.firstName;
        newUser.sureName = user.sureName;
        newUser.email = user.email;
        newUser.password = user.password;
        newUser.rol = user.rol;
        
        try {
            const result = await newUser.save();
            return result;
        } catch (error) {
        throw CustomError.internalServer("Something went very wrong" );
        }
    }

    async findAllUsers() {
        try {
            const result = await User.find({
                where: {
                    userStatus: UserStatus.ACTIVE
                }
            });
            return result;
        } catch (error) {
        throw CustomError.internalServer("Something went very wrong" );
        }
    }
    
    async findOneUser(id: number) {
        try {
            const result = await User.findOne({ where: { id } });
            return result;
        } catch (error) {
       throw CustomError.notFound("User not found");
        }
    }

    async updateUser(id: number, user: UpdateUserDto) {
        const updatedUser = await this.findOneUser(id);
        updatedUser.firstName = user.firstName;
        updatedUser.sureName = user.sureName;
        updatedUser.email = user.email;
        updatedUser.password = user.password;
        try {
            const result = await updatedUser.save();
            return updatedUser;
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong" );
        }
    }

    async deleteUser(id: number) {
        const user = await this.findOneUser(id);

        user.userStatus = UserStatus.DISABLED;

        try {
            await user.save();
            return ("Üser deleted");
        } catch (error) {    
         throw CustomError.internalServer("Something went very wrong" );
        }
    }

    async updateAccount(id: number, user: UpdateAccountUserDto) {
        const updatedUser = await this.findOneUser(id);
        updatedUser.firstName = user.firstName;
        updatedUser.sureName = user.sureName;
        updatedUser.email = user.email;
        try {
            const result = await updatedUser.save();
            return updatedUser;
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong" );
        }
    }

    async deleteAccount(id: number) {
        const user = await this.findOneUser(id);

        user.userStatus = UserStatus.DISABLED;

        try {
            await user.save();
            return ("Üser deleted");
        } catch (error) {    
         throw CustomError.internalServer("Something went very wrong" );
        }
    }
}
