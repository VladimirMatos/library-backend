import { Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { RolesService } from '@/rolesService/roles.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RolesDoc } from '@/rolesDoc/roles.doc';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOkResponse({
    description: 'Role found',
    type: [RolesDoc],
  })
  @ApiBadRequestResponse({
    description: 'Role not found',
    status: 404,
  })
  @Get()
  getAllRoles(): Promise<RolesDoc[]> {
    return this.roleService.getAllRoles();
  }

  @ApiOkResponse({
    description: 'Role found',
    type: RolesDoc,
  })
  @ApiBadRequestResponse({
    description: 'Role not found',
    status: 404,
  })
  @Get(':id')
  getOneRole(@Param('id') id: number): Promise<RolesDoc> {
    return this.roleService.getOneRoles(id);
  }

  @ApiOkResponse({
    type: [RolesDoc],
  })
  @Post()
  createRoles() {
    return this.roleService.createRoles();
  }
}
