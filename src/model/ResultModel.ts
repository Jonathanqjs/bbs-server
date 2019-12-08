


export class ResultModel<T> {
  private code: number
  private message: string
  private data: T

  constructor() {
    this.code = 200
    this.message = "成功"
  }

  public setCode(code: number) {
    this.code = code
  }
  public setMsg(msg: string) {
    this.message = msg
  }

  public setData(data: T) {
    this.data = data
  }
}