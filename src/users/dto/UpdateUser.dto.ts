import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    birthday?: string;


    @IsNumber()
    @IsOptional()
    @ApiProperty()
    height?: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    weight?: number;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @ApiProperty()
    interests?: string[];
    
}