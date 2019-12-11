import { Controller, Post, Body } from "@nestjs/common";
import { PostReplyService } from "../services/postReply.service";


@Controller('postReply')
export class PostReplyController {
  constructor(
    private readonly PostReplyService:PostReplyService
  ){}

  @Post('createReply')
  async createReply(@Body() req) {
    return await this.PostReplyService.createReply(req)
  }
}