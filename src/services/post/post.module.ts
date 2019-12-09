import { Module, NestModule } from '@nestjs/common';
import { PostBlockController } from './controller/postBlock.controller';
import { PostBlockService } from './services/postBlock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BBSBlockEntity } from 'src/entity/BBSBlock.entity';
import { BBSTopicEntity } from 'src/entity/BBSTopic.entity';
import { MiddlewareBuilder } from '@nestjs/core';
import { PostTopicController } from './controller/postTopic.controller';
import { PostTopicService } from './services/postTopic.service';

@Module({
  imports:[TypeOrmModule.forFeature([BBSBlockEntity,BBSTopicEntity])],
  controllers:[PostBlockController,PostTopicController],
  providers:[PostBlockService,PostTopicService]
})
export class PostModule {

}
