import { Module, NestModule } from '@nestjs/common';
import { PostBlockController } from './controller/postBlock.controller';
import { PostBlockService } from './services/postBlock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BBSBlockEntity } from 'src/entity/BBSBlock.entity';
import { BBSTopicEntity } from 'src/entity/BBSTopic.entity';
import { MiddlewareBuilder } from '@nestjs/core';
import { PostTopicController } from './controller/postTopic.controller';
import { PostTopicService } from './services/postTopic.service';
import { BBSReplyEntity } from 'src/entity/BBSReply.entity';
import { PostReplyController } from './controller/postReply.controller';
import { PostReplyService } from './services/postReply.service'

@Module({
  imports:[TypeOrmModule.forFeature([BBSBlockEntity,BBSTopicEntity,BBSReplyEntity])],
  controllers:[PostBlockController,PostTopicController,PostReplyController],
  providers:[PostBlockService,PostTopicService,PostReplyService]
})
export class PostModule {

}
