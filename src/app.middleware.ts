import { NestMiddleware, Injectable, Req, Res, Next } from "@nestjs/common";
import { Request, Response } from 'express'
import { LoginModel } from "./model/LoginModel";
import { ResultModel, ResultState } from "./model/ResultModel";
import { Util } from "./util/util";
import { UserEntity } from './entity/User.entity';

@Injectable()
class AppMiddleware implements NestMiddleware {
  use(@Req() req: Request, res: Response, next: () => void) {
    res.setHeader('Access-Control-Allow-Origin', req.hostname)
    LoginModel.currentUserInfo = LoginModel.loginMap[req.cookies?.token]
    next()
    // if (req.originalUrl.startsWith('/login/')) {
    //   next()
    // } else {
    //   this.loginInterceptor(req, res, next)
    // }
  }

  // loginInterceptor(req: Request, res: Response, next) {
  //   let result = new ResultModel()
  //   if (LoginModel.isContain(req.cookies?.token)) {
  //     next()
  //   } else {
  //     result.setCode(ResultState.conditionError)
  //     result.setMsg('登录已超时')
  //     res.send(result)
  //   }
  // }

}

export default AppMiddleware