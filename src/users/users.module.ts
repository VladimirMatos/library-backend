import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '@/rolesModule/roles.module';
import { User } from '@/userEntity/user.entity';
import { UsersController } from '@/userController/users.controller';
import { UsersService } from '@/userService/users.service';
import { UserRepository } from '@/userRepository/user.repository';

@Module({
  imports: [RolesModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
