import { Controller, Get, Body, Post } from '@nestjs/common';
import { PostBlockService } from '../services/postBlock.service';
import { LoginModel } from 'src/model/LoginModel';
import { Authority } from 'src/entity/User.entity';
import { PostTopicService } from '../services/postTopic.service';

@Controller('postTopic')
export class PostTopicController {
  constructor(
    private readonly postTopicService: PostTopicService) 
    {
    
  }

  @Post('createTopic')
  async createBlock(@Body() req) {
    // return await this.postBlockService.createBlock(req)
  }

  @Post('updateBlock')
  async updateBlock(@Body() req) {
    // return await this.postBlockService.updateBlock(req)
  }

}