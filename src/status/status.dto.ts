// src/error/response.interface.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
export class StatusDto {
    @ApiProperty({ type: Boolean })
    @IsBoolean()
    success: boolean;

    @ApiProperty({ type: Object })
    @IsObject()
    @IsOptional()
    data: any | null | undefined;

    @ApiProperty({ type: Object })
    @IsObject()
    @IsOptional()
    error: any | null | undefined;
}