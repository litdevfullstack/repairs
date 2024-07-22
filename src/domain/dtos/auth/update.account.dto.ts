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

export class UpdateAccountUserDto {
  private constructor(
    public readonly firstName: string,
    public readonly sureName: string,
    public readonly email: string,
  ) {}


  static create (object: { [key: string]: any }): [string?, UpdateAccountUserDto?] {
    const { firstName, sureName, email} = object;

    if (!firstName) return ['Missing first name']
    if (!sureName) return ['Missing surname']
    if (!email) return ['Missing email']
    if (!regularExps.email.test(email)) return ['Invalid email']

    

    return [undefined, new UpdateAccountUserDto(firstName, sureName, email)]
  }
}
