import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BBSTopicEntity } from "src/entity/BBSTopic.entity";
import { LoginModel } from "src/model/LoginModel";
import { ResultModel, ResultState } from "src/model/ResultModel";
import { BBSBlockEntity } from "src/entity/BBSBlock.entity";
import { PageModel } from "src/model/PageModel";
import { CustomRepository } from "src/repository/custom";

@Injectable()
export class PostTopicService {
  constructor(
    @InjectRepository(BBSBlockEntity)
    private readonly BBSBlockRepository: Repository<BBSBlockEntity>,
    @InjectRepository(BBSTopicEntity)
    private readonly BBSTopicRepository: Repository<BBSTopicEntity>
  ) { }

  public async createTopic(req: CreateTopicRequest) {
    let result = new ResultModel()
    if (!req.topic) {
      result.setCode(ResultState.parameterError)
      result.setMsg('请输入标题')
      return result
    }

    if (!req.content) {
      result.setCode(ResultState.parameterError)
      result.setMsg('请输入内容')
      return result
    }
    try {
      await this.BBSTopicRepository.insert({
        topic: req.topic,
        content: req.content,
        masterId: LoginModel.currentUser.id,
        blockId: req.blockId
      })
      let count = await this.BBSTopicRepository.count({
        blockId: req.blockId
      })
      await this.BBSBlockRepository.update({
        id: req.blockId
      }, {
        topicCount: count
      })
    } catch (e) {
      console.error(e)
    } finally {
      return result
    }
  }

  public async findTopic(req: FindTopicRequest) {
    let result = new ResultModel()
    if (typeof req.pageSize != 'number' || typeof req.page != 'number') {
      result.setCode(ResultState.parameterError)
      result.setMsg('页码或每页数量错误')
      return result
    }

    try {
      let obj = {} as BBSTopicEntity
      if (req.blockId) {
        obj.blockId = req.blockId
      }
      let list = await this.BBSTopicRepository.query(
        `SELECT a.*, b.block_name FROM bbs_topic a left join bbs_block b on a.block_id=b.block_id ${req.blockId ? 'where a.block_id =' + req.blockId : ''}`
        )
      var pageModel = new PageModel<BBSTopicEntity>({
        data: list,
        pageSize: req.pageSize
      })
    } catch (e) {
      console.error(e)
    } finally {
      result.setData(pageModel.getData(req.page))
      return result
    }
  }
}