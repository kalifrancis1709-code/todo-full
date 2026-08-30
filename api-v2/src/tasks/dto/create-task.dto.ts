<<<<<<< HEAD
import { IsNotEmpty, isNotEmpty } from 'class-validator';
=======
import { IsNotEmpty } from 'class-validator';
>>>>>>> main

export class CreateTaskDto {
  @IsNotEmpty()
  designation?: string;
}
