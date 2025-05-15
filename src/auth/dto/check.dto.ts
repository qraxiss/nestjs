import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsOptional } from 'class-validator';


export class IsUserLogged {
    @ApiProperty({
        example: true,
        description: 'Login status.',
    })
    @IsBoolean()
    status: boolean;
}
