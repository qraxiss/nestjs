// src/error/response.interface.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

export class ErrorDto {
    @ApiProperty({ type: String })
    @IsString()
    @IsOptional()
    message: string

    @ApiProperty({ type: String })
    @IsString()
    @IsOptional()
    name: string
}

export class ResponseDto {
    @ApiProperty({ type: Boolean })
    @IsBoolean()
    success: boolean;

    @ApiProperty({ type: Object })
    @IsObject()
    @IsOptional()
    data: any | null | undefined;

    @ApiProperty({ type: ErrorDto })
    @IsObject()
    @IsOptional()
    error: any | null | undefined;
}


