import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  designation?: string;
}
