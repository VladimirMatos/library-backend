import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { UserController } from '@User/controllers';
import { UserService } from '@User/services';
import { UserSchema } from '@User/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
