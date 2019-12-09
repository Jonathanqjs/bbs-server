import { NestMiddleware, Injectable, Req, Res, Next } from "@nestjs/common";
import { Request, Response } from 'express'
import { LoginModel } from "./model/LoginModel";
import { ResultModel } from "./model/ResultModel";
import { Util } from "./util/util";
import { UserEntity } from './entity/User.entity';

@Injectable()
class AppMiddleware implements NestMiddleware {
  use(@Req() req: Request, res: Response, next: () => void) {
    res.setHeader('Access-Control-Allow-Origin', req.hostname)
    LoginModel.currentUser = LoginModel.loginMap[Util.parseCookie(req.headers.cookie)?.token]
    if (req.originalUrl.startsWith('/login/')) {
      next()
    } else {
      this.loginInterceptor(req, res, next)
    }
  }

  loginInterceptor(req: Request, res: Response, next) {
    let result = new ResultModel() 
    if (LoginModel.isContain(Util.parseCookie(req.headers.cookie)?.token)) {
      next()
    } else {
      result.setCode(201)
      result.setMsg('登录已超时')
      res.send(result)
    }
  }

}

export default AppMiddleware