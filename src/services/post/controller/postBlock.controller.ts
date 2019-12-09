import { Controller, Get, Body, Post } from '@nestjs/common';
import { PostBlockService } from '../services/postBlock.service';
import { LoginModel } from 'src/model/LoginModel';
import { Authority } from 'src/entity/User.entity';

@Controller('postBlock')
export class PostBlockController {
  constructor(
    private readonly postBlockService: PostBlockService) 
    {
    
  }

  @Post('createBlock')
  async createBlock(@Body() req) {
    return await this.postBlockService.createBlock(req)
  }

  @Post('updateBlock')
  async updateBlock(@Body() req) {
    return await this.postBlockService.updateBlock(req)
  }

}