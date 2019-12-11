import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, PrimaryColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UniqueMetadata } from 'typeorm/metadata/UniqueMetadata';

export enum Authority {
  管理员 ='00',
  版主='01',
  普通成员='02'
}

@Entity({
  name:'bbs_account'
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    zerofill:true,
    name:'user_id'
  })
  id: string

  @Column({unique:true,name:'user_name'})
  userName:string
  
  @Exclude()
  @Column()
  password:string

  @CreateDateColumn({
    name:'create_date',
    length:0,
    type:'datetime'
  })
  createDate:string

  @Column({type:'date',nullable:true})
  birthday:Date

  @Column({
    type:'char',
    nullable:true
  })
  sex:'00'|'01'|'02'

  @Column({
    type:'varchar',
    default:Authority.普通成员
  })
  authority:string

  constructor(partial: Partial<UserEntity>) {
    super()
    Object.assign(this, partial);
  }
}
