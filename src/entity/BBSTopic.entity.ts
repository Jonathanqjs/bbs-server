import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, OneToOne, UpdateDateColumn, JoinColumn } from "typeorm";
import { BBSBlockEntity } from "./BBSBlock.entity";
import { UserEntity } from "./User.entity";


@Entity({
  name:'bbs_topic'
})
export class BBSTopicEntity {

  @PrimaryGeneratedColumn({
    zerofill:true
  })
  id:string


  @Column({name:'block_id'})
  blockId:string

  
  @Column({name:'master_id'})
  masterId:string

  @Column({
    name:'reply_count',
    type:'int',
    default:0
  })
  replyCount:number

  @Column({type:'varchar',zerofill:false})
  topic:string

  @Column({type:'varchar',zerofill:false})
  content:string

  @CreateDateColumn({
    name:'create_time',
    type:'datetime'})
  createTime:string

  @Column({
    name:'click_count',
    type:'int',
    default:0
  })
  clickCount:number

  @Column({
    type:'varchar',
    default:'01'
  })
  flag:'01'|'02'|'03'|'04'

  @Column({
    name:'last_reply_user',
    nullable:true
  })
  lastReplyUser:string

  @Column({
    name:'last_reply_time',
    type:'datetime',
    nullable: true
  })
  lastReplyTime:string

}