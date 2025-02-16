import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
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
    @ApiOperation({ summary: 'Create a new user (Admin required)' })
    @ApiCreatedResponse({ description: 'User successfully created' })
    @ApiBody({ type: CreateUserDto })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @AdminAuth()
    @ApiOperation({ summary: 'List all users (Admin required)' })
    @ApiResponse({ status: 200, description: 'List of users' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @AdminAuth()
    @ApiOperation({ summary: 'Get user details by ID (Admin required)' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'User details' })
    @ApiResponse({ status: 404, description: 'User not found' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Put(':id')
    @AdminAuth()
    @ApiOperation({ summary: 'Update user details (Admin required)' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, description: 'User successfully updated' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @AdminAuth()
    @ApiOperation({ summary: 'Delete user (Admin required)' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'User successfully deleted' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}