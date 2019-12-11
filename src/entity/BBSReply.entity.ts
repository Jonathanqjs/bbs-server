import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({
  name:'bbs_reply'
})
export class BBSReplyEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    name:'reply_id',
    zerofill:true
  })
  id:string

  @Column({name:'topic_id'})
  topicId:string

  @Column({name:'block_id'})
  blockId:string

  @Column({name:'reply_user_id'})
  replyUserId:string

  @Column({name:'content'})
  content:string

  @CreateDateColumn({name:'create_time'})
  createTime:string

  @Column({name:'like',type:'int',default:0})
  like:number

  @Column({name:'unlike',type:'int',default:0})
  unlike:number
}