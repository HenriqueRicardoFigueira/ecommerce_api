import { IsInt, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class OrderDto {
  @IsNumber()
  @IsPositive()
  total: number;

  @IsInt()
  client_id: number;

  @IsString()
  item: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsInt()
  item_id: number;
}
