import { Injectable, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResultModel, ResultState } from 'src/model/ResultModel';
import { LoginModel } from 'src/model/LoginModel';
import { Util } from 'src/util/util';
import { UserEntity } from 'src/entity/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const uuidv1 = require('uuid/v1');

@Injectable()
export class LoginService {

  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }


  async login(req: Request, res: Response) {
    let result = new ResultModel()
    let body:LoginRequest = req.body
    if (!Reflect.has(body, 'userName')) {
      result.setCode(ResultState.parameterError)
      result.setMsg('请输入用户名')
      return result
    }

    if (!Reflect.has(body, 'password')) {
      result.setCode(ResultState.parameterError)
      result.setMsg('请输入密码')
      return result
    }

    let user = await this.userRepository.findOne({
      userName: body.userName
    })
    if (typeof user == 'undefined' ||Util.AESDecrypt(user.password) != body.password) {
      result.setCode(ResultState.parameterError)
      result.setMsg('用户名或密码错误')
      return result
    }

    if (LoginModel.isContain(req.cookies?.token)) {
      result.setCode(ResultState.conditionError)
      result.setMsg('该用户已经登录，请勿重复登录')
      return result
    } else {
      let token = uuidv1()
      delete user.password
      for(let key in LoginModel.loginMap) {
        if(LoginModel.loginMap[key].userName == body.userName) {
          Reflect.deleteProperty(LoginModel.loginMap,key)
        }
      }
      LoginModel.loginMap = {
        ...LoginModel.loginMap,
        [token]: user
      }
      res.cookie('token', token, { expires: new Date(Date.now() + 1000*60*60*24*7), httpOnly: true })
      result.setCode(ResultState.success)
      result.setMsg('登录成功')
      result.setData(body)
      return result
    }
  }

  

  logout(req: Request) {
    let result = new ResultModel()
    let cookie = req.cookies
    if (!Reflect.has(LoginModel.loginMap, cookie.token)) {
      result.setCode(ResultState.parameterError)
      result.setMsg('用户尚未登录，请重新登录')
    } else {
      Reflect.deleteProperty(LoginModel.loginMap, cookie.token)
    }
    return result
  }

  async register(req:RegisterRequest) {
    let result = new ResultModel()
    let user = await this.userRepository.findOne({
      userName: req.userName
    })
    if (typeof user != 'undefined') {
      result.setMsg('该用户名已被注册')
      result.setCode(ResultState.parameterError)
      return result
    }
    if (!Util.judgePassword(req.password)) {
      result.setMsg('密码设置过于简单')
      result.setCode(ResultState.parameterError)
      return result
    }
    try {
      await this.userRepository.insert(
        {
          userName: req.userName,
          password:Util.AESEncrypt(req.password),
        }
      )
      return result
    }catch(e) {
      result.setCode(ResultState.conditionError)
      result.setMsg(e)
      return result
    }
  }

  async changPwd(req:changePwdRequest) {
    let result = new ResultModel()

    if (!LoginModel.currentUserInfo) {
      result.setCode(ResultState.parameterError)
      result.setMsg('用户尚未登录，请重新登录')
      return result
    }

    let user = await this.userRepository.findOne({
      userName: req.userName
    })

    if (typeof user == 'undefined') {
      result.setCode(ResultState.parameterError)
      result.setMsg('没有该用户')
      return result
    }
    if (Util.AESDecrypt(user.password) != req.oldPassword) {
      result.setCode(ResultState.parameterError)
      result.setMsg('用户密码错误')
      return result
    }

    if (!Util.judgePassword(req.newPassword)) {
      result.setCode(ResultState.parameterError)
      result.setMsg('用户新密码过于简单')
      return result
    }
    try {
      await this.userRepository.update({
        userName: req.userName
      }, { password: Util.AESEncrypt(req.newPassword) })
    }
    finally {
      return result
    }
  }

  async queryInfo(req:Request) {
    let result = new ResultModel()
    if(!LoginModel.isLoggedIn()) {
      result.setCode(ResultState.conditionError)
      result.setMsg('用户尚未登录，请重新登录')
      return result
    } 

    result.setData(LoginModel.currentUserInfo) 
    return result
    
  }
}
