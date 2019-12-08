import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {isMainThread,Worker} from 'worker_threads'
import { LoginModule } from './services/login/login.module';
import AppMiddleware from './app.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModel } from './model/UserModel.entity';
import { PostModule } from './services/post/post.module';

@Module({
  imports: [LoginModule,TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "13185",
    "database": "mybbs",
    "entities": [UserModel],
    "synchronize": true
  }), PostModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes({path: "*" ,method:RequestMethod.ALL})
  }
  
}


