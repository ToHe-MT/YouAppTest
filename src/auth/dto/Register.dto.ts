import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsString, MinLength, ValidateNested, isNotEmpty } from "class-validator";

export class RegisterDto{
    @IsString()
    @MinLength(6)
    @ApiProperty()
    readonly username: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly password: string;
}