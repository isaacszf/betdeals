import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  bettingHouse: string;

  @Column()
  affiliate: string;

  @Column({ type: 'double' })
  revenueSharePercentage: number;

  @Column({ type: 'double' })
  value: number;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column()
  currency: string;

  @Column()
  paymentCycle: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updated?: Date;
}
