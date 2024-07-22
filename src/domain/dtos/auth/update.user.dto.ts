import { regularExps } from '../../../config/regular-exp';

enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  CLIENT = 'CLIENT'
}

enum UserStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED'
}

export class UpdateUserDto {
  private constructor(
    public readonly firstName: string,
    public readonly sureName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly userStatus?: UserStatus,
    public readonly rol?: UserRole
  ) {}


  static create (object: { [key: string]: any }): [string?, UpdateUserDto?] {
    const { firstName, sureName, email, password, userStatus, rol} = object;

    if (!firstName) return ['Missing first name']
    if (!sureName) return ['Missing surname']
    if (!email) return ['Missing email']
    if (!regularExps.email.test(email)) return ['Invalid email']
    if (!password) return ['Missing password']
    if (!regularExps.password.test(password)) return ['The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character']
    if(!userStatus) return ['Missing status'];
    if (!Object.values(UserStatus).includes(userStatus as UserStatus)) return ['Invalid status'];
    if(!rol) return ['Missing status'];
    if (!Object.values(UserRole).includes(rol as UserRole)) return ['Invalid status'];
    

    return [undefined, new UpdateUserDto(firstName, sureName, email, password, userStatus, rol)]
  }
}
