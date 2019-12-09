import { PrimaryGeneratedColumn, PrimaryColumn, Column, OneToOne, ManyToOne, Entity, JoinColumn } from "typeorm";
import { UserEntity } from "./User.entity";

@Entity({
  name:'bbc_block'
})
export class BBSBlockEntity {

  @PrimaryGeneratedColumn({
    zerofill:true
  })
  id:string

  @Column({unique:true})
  name:string

  @Column({name:'master_id'})
  masterId:string

  @Column()
  profile:string

  @Column({
    name:'topic_count',
    type:'int',
    default:0
  })
  topicCount:number

  @Column({
    name:'click_count',
    type:'int',
    default: 0
  })
  clickCount:number

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}