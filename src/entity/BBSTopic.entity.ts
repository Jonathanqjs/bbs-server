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

  @Column()
  block:string


  @Column()
  master:string

  @Column({
    type:'int',
    default:0
  })
  replyCount:number

  @Column('varchar')
  topic:string

  @Column('varchar')
  content:string

  @CreateDateColumn({type:'datetime'})
  createTime:string

  @Column('int')
  clickCount:number

  @Column('char')
  flag:'01'|'02'|'03'|'04'

  @Column()
  lastReplyUser:string

  @UpdateDateColumn({
    type:'datetime',
    nullable: true
  })
  lastReplyTime:string

}