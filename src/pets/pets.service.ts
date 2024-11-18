import { Injectable } from '@nestjs/common';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly PetRpository: Repository<Pet>
  ) { }

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.PetRpository.create(createPetInput)
    return await this.PetRpository.save(newPet)
  }

  async findAll(): Promise<Pet[]> {
    return this.PetRpository.find()
  }
}
