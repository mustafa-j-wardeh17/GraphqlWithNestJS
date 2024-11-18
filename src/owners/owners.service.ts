import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>
  ) { }

  create(createOwnerInput: CreateOwnerInput) {
    return 'This action adds a new owner';
  }

  findAll(): Promise<Owner[]> {
    return this.ownerRepository.find()
  }

  findOne(id: number): Promise<Owner> {
    return this.ownerRepository.findOne({ where: { id } })
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
