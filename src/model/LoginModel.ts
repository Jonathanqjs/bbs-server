import { Req } from "@nestjs/common"
import {Request} from 'express'
import { Util } from "src/util/util"
import { UserEntity } from '../entity/User.entity'

export class LoginModel {
  static loginMap:{[token:string]:UserEntity} = {}
  static currentUser:UserEntity
  constructor() {

  }

  static isContain(token: string): boolean {
    return Reflect.has(this.loginMap,token)
  }

}