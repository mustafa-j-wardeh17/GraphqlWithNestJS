import { Injectable } from '@nestjs/common';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from '../owners/entities/owner.entity';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly PetRpository: Repository<Pet>,
    @InjectRepository(Owner) // Ensure that the OwnerRepository is injected here
    private readonly ownerRepository: Repository<Owner>,
  ) { }

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.PetRpository.create(createPetInput)
    return await this.PetRpository.save(newPet)
  }

  async findAll(): Promise<Pet[]> {
    return this.PetRpository.find({
      relations: ['owner']
    })
  }

  async findOne(id: number): Promise<Pet> {
    return this.PetRpository.findOne({
      where: {
        id
      },
      relations:['owner']
    })
  }
}
