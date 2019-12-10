import { PrimaryGeneratedColumn, PrimaryColumn, Column, OneToOne, ManyToOne, Entity, JoinColumn, BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";

@Entity({
  name:'bbs_block'
})
export class BBSBlockEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    name:'block_id',
    zerofill:true
  })
  id:string

  @Column({
    name:'block_name',
    unique:true})
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
    super()
    Object.assign(this, partial);
  }
}

