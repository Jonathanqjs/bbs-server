
interface CreateTopicRequest {
  topic: string,
  content: string,
  blockId: string
}

interface FindTopicRequest {
  blockId?: string,
  page: number,
  pageSize: number
}