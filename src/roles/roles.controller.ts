import { Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from './role.entity';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Get()
  getAllRoles(): Promise<Roles[]> {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  getOneRole(@Param() id: number): Promise<Roles | HttpException> {
    return this.roleService.getOneRoles(id);
  }

  @Post()
  createRoles() {
    return this.roleService.createRoles();
  }
}
