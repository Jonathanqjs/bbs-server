import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BBSBlockEntity } from "src/entity/BBSBlock.entity";
import { CustomRepository } from "src/repository/custom";
import { BBSTopicEntity } from "src/entity/BBSTopic.entity";
import { BBSReplyEntity } from "src/entity/BBSReply.entity";
import { Repository } from "typeorm";
import { ResultModel, ResultState } from "src/model/ResultModel";
import { LoginModel } from "src/model/LoginModel";
import { PageModel } from "src/model/PageModel";

@Injectable()
export class PostReplyService {
  constructor(
    @InjectRepository(BBSBlockEntity)
    private readonly BBSBlockRepository: Repository<BBSBlockEntity>,
    @InjectRepository(BBSTopicEntity)
    private readonly BBSTopicRepository: Repository<BBSTopicEntity>,
    @InjectRepository(BBSReplyEntity)
    private readonly BBSReplyRepository: Repository<BBSReplyEntity>
  ){
    
  }

  async createReply(req) {
    let result = new ResultModel()
    if(!LoginModel.isLoggedIn()) {
      result.setCode(ResultState.conditionError)
      result.setMsg('请登录')
      return result
    }

    if(!req.content) {
      result.setCode(ResultState.parameterError)
      result.setMsg('请输入内容')
      return result
    }

    try {
      let blockId = (await this.BBSTopicRepository.findOne({
        id:req.topicId
      })).blockId
      await this.BBSReplyRepository.insert({
        content:req.content,
        topicId:req.topicId,
        blockId,
        replyUserId:LoginModel.currentUser.id
      })
    } catch(e) {
      console.error(e)
    } finally {
      return result
    }
  }

  async findReply(req) {
    let result = new ResultModel()
    if(!req.topicId) {
      result.setCode(ResultState.parameterError)
      result.setMsg('请发送主题id')
      return result
    }
    if(!req.page) {
      result.setCode(ResultState.parameterError)
      result.setMsg('请发送页码数')
      return result
    }

    if(!req.pageSize) {
      result.setCode(ResultState.parameterError)
      result.setMsg('请发送每页数量')
      return result
    }


    let list = await this.BBSReplyRepository.query(`
      select a.*, b.user_name from bbs_reply a 
      left join bbs_account b on a.reply_user_id = b.user_id 
      where topic_id = ${req.topicId} 
      order by a.create_time desc 
    `)
    let pageList = new PageModel({
      data:list,
      pageSize:req.pageSize,
    })
    result.setData(pageList.getData(req.page))
    return result
  }
}