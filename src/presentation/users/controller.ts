import { Request, Response } from "express"
import { UserService } from "../services/user.service"
import { LoginUserDTO } from "../../domain/dtos/auth/login-user.dto";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UpdateUserDto } from "../../domain/dtos/auth/update.user.dto";
import { UpdateAccountUserDto } from "../../domain/dtos/auth/update.account.dto";



export class UserController {


    constructor(
        public readonly userService: UserService,
        public readonly authService: AuthService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ message: error.message })
        }
    
        console.log(error)
        return res.status(500).json({ message: 'Something went very wrong! 🧨' })
      }

    createUser = async (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        this.userService.createUser(registerUserDto)
        .then((result) => {
            return res.status(201).json(result)
        }).catch((err) => {
            return res.status(500).json(err)                                               
        });
    }

    findAllUsers = async (req: Request, res: Response) => {
        
        this.userService.findAllUsers()
        .then((result) => {
            return res.status(200).json(result)
        }).catch((err) => {
            return res.status(500).json(err)
        });

    }

    findOneUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        this.userService.findOneUser(+id)
        .then((result) => {
            return res.status(200).json(result)
        }).catch((err) => { 
            return res.status(500).json(err)
        })

    }

    UpdateUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, updateUserDto] = UpdateUserDto.create(req.body)
        if (error) {
            return res.status(400).json({ error });
        }
        this.userService.updateUser(+id, updateUserDto)
        .then((result) => {
            return res.status(200).json(result)
        }).catch((err) => {
            return res.status(500).json(err)
        })

    }

    deleteUser = async(req: Request, res: Response) => {
        const { id } = req.params;
        this.userService.deleteUser(+id)
        .then((result) => {
            return res.status(200).json(result)
        }).catch((err) => {
            return res.status(500).json(err)
        })
    }

    login = async (req: Request, res: Response) => {
        const [ error, loginUserDto ] = LoginUserDTO.create(req.body);
        if(error) return res.status(422).json({ message: error });
    
        this.authService.login(loginUserDto!)
            .then(data => res.status(200).json(data))
            .catch(error => this.handleError(error, res))
      }

    updateAccount = async (req: Request, res: Response) => { 
        const { id } = req.params;
        const [error, updateAccountUserDto] = UpdateAccountUserDto.create(req.body)
        if (error) {
            return res.status(400).json({ error });
        }
        this.userService.updateAccount(+id, updateAccountUserDto)
        .then((result) => {
            return res.status(200).json(result)
        }).catch((err) => {
            return res.status(500).json(err)
        })
    }

    deleteAccount = async(req: Request, res: Response) => {
        const { id } = req.params;
        this.userService.deleteAccount(+id)
        .then((result) => {
            return res.status(200).json(result)
        }).catch((err) => {
            return res.status(500).json(err)
        })
    }
}
