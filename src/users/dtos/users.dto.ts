import { PickType } from '@nestjs/swagger';
import {
  Matches,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  IsEmpty,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDTO {
  /**
   * @description Este parametro recibe el nombre como un string de al menos 3 caracteres
   * @example Bartolomiau
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  /**
   * @description Este parametro recibe el email como un string de al menos 3 caracteres
   * @example barto@gmail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * @description Este parametro recibe el nombre como un string de al menos 3 caracteres
   * @example Password123*
   */
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
  })
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  passwordConfirmation: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  /**
   @example ""
   */
  @IsEmpty()
  isAdmin?: boolean;
}

export class LoginUserDTO extends PickType(CreateUserDTO, [
  'password',
  'email',
]) {}
