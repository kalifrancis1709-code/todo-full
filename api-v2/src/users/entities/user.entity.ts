import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  prenom: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  photoUrl: string | null;

  // ===== AJOUT DU RÔLE =====
  @Column({ type: 'varchar', length: 50, default: 'user' })
  role: string;

  @Column({ type: 'json', nullable: true })
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;
}
