interface CreateReplyRequest{
  topicId:string,
  content:string
}

interface FindReplayRequest {
  page:number
  pageSize:number,
  topicId:string
}