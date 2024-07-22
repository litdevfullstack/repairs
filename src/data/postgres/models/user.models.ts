import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn } from "typeorm/decorator/columns/CreateDateColumn";
import { UpdateDateColumn } from "typeorm/decorator/columns/UpdateDateColumn";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { bcryptAdapter } from "../../../config/bcrypt.adapter";

enum UserRole {
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
    CLIENT = 'CLIENT'
}

enum UserStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED'
}


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 120
    })
    firstName: string;

    
    @Column({
        type: 'varchar',
        nullable: true,
        length: 120
    })
    sureName: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 120
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 255
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 120
    })

    @Column({
        enum: UserRole,
        nullable: true,
        default: UserRole.CLIENT
    })
    rol: UserRole;

    @Column({
        enum: UserStatus,
        nullable: false,
        default: UserStatus.ACTIVE
    })
    userStatus: UserStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    encryptPassword() {
        this.password = bcryptAdapter.hash(this.password)
    }
}