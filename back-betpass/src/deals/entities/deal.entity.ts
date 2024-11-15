import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'integer' })
  score: number;

  @Column({ type: 'boolean' })
  isExhausted: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
