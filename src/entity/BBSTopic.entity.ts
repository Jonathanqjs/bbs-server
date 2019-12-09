import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { BBSBlockEntity } from "./BBSBlock.entity";
import { UserEntity } from "./User.entity";


@Entity({
  name:'bbs_topic'
})
export class BBSTopicEntity {

  @PrimaryGeneratedColumn()
  id:string

  @ManyToOne(type=>BBSBlockEntity, block=>block.id)
  block:BBSBlockEntity

  @ManyToOne(type=>UserEntity,user=>user.id)
  master:UserEntity

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

  @ManyToOne(type=>UserEntity,user=>user.id)
  lastReplyUser:UserEntity

  @UpdateDateColumn({
    type:'datetime',
    nullable: true
  })
  lastReplyTime:string

}