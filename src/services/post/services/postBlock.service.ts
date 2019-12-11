import { Injectable } from '@nestjs/common';
import { Repository, getCustomRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BBSBlockEntity } from 'src/entity/BBSBlock.entity';
import { BBSTopicEntity } from 'src/entity/BBSTopic.entity';
import { ResultModel, ResultState } from 'src/model/ResultModel';
import { LoginModel } from 'src/model/LoginModel';
import { Authority } from 'src/entity/User.entity';
import { CustomRepository } from 'src/repository/custom';

@Injectable()
export class PostBlockService {
  constructor(
    @InjectRepository(BBSBlockEntity)
    private readonly BBSBlockRepository: Repository<BBSBlockEntity>,
    @InjectRepository(BBSTopicEntity)
    private readonly BBSTopicRepository: Repository<BBSTopicEntity>) {
  }

  async createBlock(req: CreateBlockRequest) {
    let result = new ResultModel()
    if(!LoginModel.isLoggedIn()) {
      result.setCode(ResultState.conditionError)
      result.setMsg('请先登录')
      return result
    }
    if (LoginModel.currentUser.authority != Authority.管理员) {
      result.setCode(ResultState.conditionError)
      result.setMsg('权限不足')
      return result
    }
    if (!req.blockName || !req.blockProfile) {
      result.setCode(ResultState.parameterError)
      result.setMsg('版块名字和简介为空')
      return result
    }

    if (await this.BBSBlockRepository.count({
      name: req.blockName
    }) != 0) {
      result.setCode(ResultState.parameterError)
      result.setMsg('已有同名板块')
      return result
    }

    try {
      await this.BBSBlockRepository.insert({
        name: req.blockName,
        masterId: LoginModel.currentUser.id,
        profile: req.blockProfile
      })
    } catch (e) {
      console.error(e)
    } finally {
      return result
    }
  }


  async updateBlock(req: UpdateBlockRequest) {
    let result = new ResultModel()
    if(!LoginModel.isLoggedIn()) {
      result.setCode(ResultState.conditionError)
      result.setMsg('请先登录')
      return result
    }
    let bbsBlock = await this.BBSBlockRepository.findOne({
      id: req.id
    })
    if (typeof bbsBlock == 'undefined') {
      result.setCode(ResultState.parameterError)
      result.setMsg('该版块不存在')
      return result
    }
    console.log(LoginModel.currentUser)
    console.log(bbsBlock)
    if (LoginModel.currentUser.authority != Authority.管理员 && LoginModel.currentUser.id != bbsBlock.masterId) {
      result.setCode(ResultState.conditionError)
      result.setMsg('权限不足')
      return result
    }

    try {
      await this.BBSBlockRepository.update({
        id: req.id
      }, req)
    } catch (e) {
      result.setData(e)
    } finally {
      return result
    }
  }

  async findBlock() {
    let result = new ResultModel()
    try {
      var blockList = await this.BBSBlockRepository.find()
    } catch (e) {
      console.error(e)
    } finally {
      result.setData(blockList)
      return result
    }
  }
}
