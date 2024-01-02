import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength, ValidateIf } from "class-validator";

export class LoginDto{
    @ValidateIf((o) => o.username === undefined) // Validate if username field is not present
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;
    
    @ValidateIf((o) => o.email === undefined) // Validate if email field is not present
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly username: string;
    

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    readonly password: string;
}