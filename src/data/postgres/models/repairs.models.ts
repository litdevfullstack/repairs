import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

enum RepairsStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

@Entity()
export class Repairs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
    nullable: false
  })
  date: Date;

  @Column({
    type: 'int', 
    nullable: true
  })
  motorsNumber: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  description: string; 

  @Column({
    type: 'enum',
    enum: RepairsStatus,
    default: RepairsStatus.PENDING,
    nullable: false
  })
  status: RepairsStatus;

  @Column({ 
    type: 'int',
    nullable: false
  })
  user_id: number; 

  @CreateDateColumn()
  created_at: Date; 

  @UpdateDateColumn()
  updated_at: Date; 
}
