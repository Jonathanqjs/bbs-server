import { Controller, Post, Req, Body, Res, } from '@nestjs/common';
import { Response,Request } from 'express';
import { ResultModel } from 'src/model/ResultModel';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {

  }

  @Post('login')
  async login(@Req() req: Request,@Res() res:Response) {
    return res.send(await this.loginService.login(req,res))
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    return await this.loginService.logout(req)
  }

  @Post('register')
  async register(@Body() req:RegisterRequest) {
    return await this.loginService.register(req)
  }

  @Post('changePwd')
  async changePwd(@Body() req:changePwdRequest) {
    return await this.loginService.changPwd(req)
  }

  @Post('queryInfo')
  async queryInfo(@Req() req) {
    return await this.loginService.queryInfo(req)
  }

}
