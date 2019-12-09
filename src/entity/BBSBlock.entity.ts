import { PrimaryGeneratedColumn, PrimaryColumn, Column, OneToOne, ManyToOne, Entity } from "typeorm";
import { UserEntity } from "./User.entity";

@Entity({
  name:'bbc_block'
})
export class BBSBlockEntity {

  @PrimaryGeneratedColumn()
  id:string

  @Column({unique:true})
  name:string

  @ManyToOne(type=>UserEntity,user=>user.id)
  master:UserEntity

  @Column()
  profile:string

  @Column('int')
  topicCount:number

  @Column('int')
  clickCount:number

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}