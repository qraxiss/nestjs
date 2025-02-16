import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminAuth } from 'src/auth/decorators/admin.decorator';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiBearerAuth,
    ApiParam,
    ApiCreatedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @AdminAuth()
    @ApiOperation({ summary: 'Yeni kullanıcı oluşturma (Admin gerektirir)' })
    @ApiCreatedResponse({ description: 'Kullanıcı başarıyla oluşturuldu' })
    @ApiBody({ type: CreateUserDto }) // 👈 Request body şeması
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @AdminAuth()
    @ApiOperation({ summary: 'Tüm kullanıcıları listeleme (Admin gerektirir)' })
    @ApiResponse({ status: 200, description: 'Kullanıcı listesi' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @AdminAuth()
    @ApiOperation({ summary: 'ID ile kullanıcı detaylarını getirme (Admin gerektirir)' })
    @ApiParam({ name: 'id', description: 'Kullanıcı ID' }) // 👈 Parametre dokümantasyonu
    @ApiResponse({ status: 200, description: 'Kullanıcı detayları' })
    @ApiResponse({ status: 404, description: 'Kullanıcı bulunamadı' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Put(':id')
    @AdminAuth()
    @ApiOperation({ summary: 'Kullanıcı bilgilerini güncelleme (Admin gerektirir)' })
    @ApiParam({ name: 'id', description: 'Kullanıcı ID' })
    @ApiBody({ type: UpdateUserDto }) // 👈 Güncelleme için body şeması
    @ApiResponse({ status: 200, description: 'Kullanıcı başarıyla güncellendi' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @AdminAuth()
    @ApiOperation({ summary: 'Kullanıcı silme (Admin gerektirir)' })
    @ApiParam({ name: 'id', description: 'Kullanıcı ID' })
    @ApiResponse({ status: 200, description: 'Kullanıcı başarıyla silindi' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}