import { Controller, Get, Body, Post } from '@nestjs/common';
import { PostBlockService } from '../services/postBlock.service';
import { LoginModel } from 'src/model/LoginModel';
import { Authority } from 'src/entity/User.entity';
import { ResultModel } from 'src/model/ResultModel';
import { BBSBlockEntity } from 'src/entity/BBSBlock.entity';

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

  @Post('findBlock')
  async findBlock(){
    return await this.postBlockService.findBlock()
  }

}