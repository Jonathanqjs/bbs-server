import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserModel } from 'src/model/UserModel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([UserModel])],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
