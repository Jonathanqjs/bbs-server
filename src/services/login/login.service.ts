import { Injectable, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResultModel } from 'src/model/ResultModel';
import { LoginModel } from 'src/model/LoginModel';
import { Util } from 'src/util/util';
import { UserModel } from 'src/model/UserModel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import jsencrypt from 'jsencrypt'

@Injectable()
export class LoginService {

  constructor(@InjectRepository(UserModel) private readonly userRepository: Repository<UserModel>) { }


  async login(req: Request, res: Response) {
    let result = new ResultModel()
    let body = req.body
    if (!Reflect.has(body, 'userName')) {
      result.setCode(4406)
      result.setMsg('请输入用户名')
      return result
    }

    if (!Reflect.has(body, 'password')) {
      result.setCode(4406)
      result.setMsg('请输入密码')
      return result
    }

    let user = await this.userRepository.findOne({
      userName: body.userName
    })
    if (typeof user == 'undefined' || user.password != body.password) {
      result.setCode(4406)
      result.setMsg('用户名或密码错误')
      return result
    }

    let cookieToken = Util.parseCookie(req.headers.cookie)?.token
    if (LoginModel.isContain(cookieToken) && LoginModel.currentUser.userName === body.userName) {
      result.setCode(201)
      result.setMsg('该用户已经登录，请勿重复登录')
      return result
    } else {
      let token = new Date().getTime()
      LoginModel.loginMap[token] = new UserModel(body.userName)
      res.cookie('token', token, { expires: new Date(Date.now() + 900000), httpOnly: true })
      result.setCode(200)
      result.setMsg('登录成功')
      result.setData(body)
      return result
    }
  }

  logout(req: Request) {
    let result = new ResultModel()
    let cookie = Util.parseCookie(req.headers.cookie)
    if (!Reflect.has(LoginModel.loginMap, cookie.token)) {
      result.setCode(201)
      result.setMsg('用户尚未登录，请重新登录')
    } else {
      Reflect.deleteProperty(LoginModel.loginMap, cookie.token)
    }
    return result
  }

  async register(req) {
    let result = new ResultModel()
    let user = await this.userRepository.findOne({
      userName: req.userName
    })
    if (typeof user != 'undefined') {
      result.setMsg('该用户名已被注册')
      result.setCode(201)
      return result
    }
    if (!Util.judgePassword(req.password)) {
      result.setMsg('密码设置过于简单')
      result.setCode(202)
      return result
    }
    try {
      await this.userRepository.insert(
        {
          userName: req.userName,
          password: req.password, 
          createDate: Util.getCurrentTime()
        }
      )
    } finally {
      return result
    }  
  }
}