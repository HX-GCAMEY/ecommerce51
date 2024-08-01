import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/entities/products.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  /**
   * @example ["id","id2"]
   */

  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products[]>;
}
