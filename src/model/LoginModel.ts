import { Req } from "@nestjs/common"
import {Request} from 'express'
import { Util } from "src/util/util"
import { UserEntity } from '../entity/User.entity'

export class LoginModel {
  static loginMap:{[token:string]:UserEntity} = {}
  static currentUserInfo:UserEntity
  constructor() {

  }

  /**
   * 是否已经登录
   */
  static isLoggedIn() {
    return typeof this.currentUserInfo !== 'undefined'
  }

  static isContain(token: string): boolean {
    return Reflect.has(this.loginMap,token)
  }

}