import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

  constructor(designation: string) {
    this.designation = designation;
  }
}
