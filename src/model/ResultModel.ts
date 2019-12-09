

export enum ResultState {
  success = 200,
  parameterError = 4406,
  conditionError = 4100
}

export class ResultModel<T> {
  private code: ResultState
  private message: string
  private data: T

  constructor() {
    this.code = ResultState.success
    this.message = "成功"
  }

  public setCode(code: ResultState) {
    this.code = code
  }
  public setMsg(msg: string) {
    this.message = msg
  }

  public setData(data: T) {
    this.data = data
  }
}