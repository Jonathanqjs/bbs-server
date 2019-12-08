import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, PrimaryColumn } from 'typeorm';

@Entity({
  name:'account'
})
export class UserModel {
  @PrimaryGeneratedColumn({
    zerofill:true
  })
  id: string

  @PrimaryColumn()
  userName:string

  @Column()
  password:string

  @Column()
  createDate:string

  constructor(userName) {
    this.userName = userName
  }
}