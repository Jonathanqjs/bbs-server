import { Module, NestModule } from '@nestjs/common';
import { PostBlockController } from './controller/postBlock.controller';
import { PostBlockService } from './services/postBlock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BBSBlockEntity } from 'src/entity/BBSBlock.entity';
import { BBSTopicEntity } from 'src/entity/BBSTopic.entity';
import { MiddlewareBuilder } from '@nestjs/core';

@Module({
  imports:[TypeOrmModule.forFeature([BBSBlockEntity,BBSTopicEntity])],
  controllers:[PostBlockController],
  providers:[PostBlockService]
})
export class PostModule {

}
