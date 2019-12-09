import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BBSBlockEntity } from 'src/entity/BBSBlock.entity';
import { BBSTopicEntity } from 'src/entity/BBSTopic.entity';

@Injectable()
export class PostBlockService {
  constructor(
    @InjectRepository(BBSBlockEntity)
    private readonly BBSBlockEntity: Repository<BBSBlockEntity>,
    @InjectRepository(BBSTopicEntity)
    private readonly BBSTopicEntity: Repository<BBSTopicEntity>) { 
  }

  createBlock() {
    
  }

}
