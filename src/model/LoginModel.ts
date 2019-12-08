import { Req } from "@nestjs/common"
import {Request} from 'express'
import { Util } from "src/util/util"
import { UserModel } from "./UserModel.entity"

export class LoginModel {
  static loginMap:{[token:string]:UserModel} = {}
  static currentUser:UserModel
  constructor() {

  }

  static isContain(token: string): boolean {
    return Reflect.has(this.loginMap,token)
  }

}