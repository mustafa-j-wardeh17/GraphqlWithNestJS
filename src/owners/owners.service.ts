import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';
import { Pet } from 'src/pets/entities/pet.entity';
import { PetInput } from './dto/pet.input';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>
  ) { }

  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    // Create the pets or link existing ones
    const pets = createOwnerInput.pets && (
      await Promise.all(
        createOwnerInput.pets.map(petInput => this.preloadPet(petInput))
      )
    );

    const createOwner = this.ownerRepository.create({
      ...createOwnerInput,
      pets
    });

    return await this.ownerRepository.save(createOwner);
  }

  async preloadPet(petInput: PetInput): Promise<Pet> {

    const existingPet = await this.petRepository.findOne({ where: { name: petInput.name } });
    if (existingPet) {
      return existingPet;
    }


    // If the pet doesn't exist, create a new one
    const newPet = this.petRepository.create(petInput);
    return await this.petRepository.save(newPet);
  }



  findAll(): Promise<Owner[]> {
    return this.ownerRepository.find({
      relations: ['pets']
    })
  }

  findOne(id: number): Promise<Owner> {
    return this.ownerRepository.findOne({
      where: { id },
      relations: ['pets']
    })
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
