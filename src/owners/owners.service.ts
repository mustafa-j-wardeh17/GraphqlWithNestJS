import { Injectable, NotFoundException } from '@nestjs/common';
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


  //----------------------------------------
  //--------------Create Owner--------------
  //----------------------------------------
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


  //----------------------------------------
  //---------------Get Owners---------------
  //----------------------------------------
  findAll(): Promise<Owner[]> {
    return this.ownerRepository.find({
      relations: ['pets']
    })
  }


  //----------------------------------------
  //---------------Get Owner----------------
  //----------------------------------------
  findOne(id: number): Promise<Owner> {
    return this.ownerRepository.findOne({
      where: { id },
      relations: ['pets']
    })
  }


  //----------------------------------------
  //-------------Update Owner---------------
  //----------------------------------------
  update(updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${updateOwnerInput.id} owner`;
  }


  //----------------------------------------
  //-------------Delete Owner---------------
  //----------------------------------------
  //----------------------------------------
  //-------------Delete Owner---------------
  //----------------------------------------
  async remove(id: number): Promise<string> {
    try {
      const findOwner = await this.ownerRepository.findOne({
        where: { id },
        relations: ['pets'], 
      });

      // Check if owner exists
      if (!findOwner) {
        throw new NotFoundException(`Owner with id=${id} not found`);
      }

      // Delete associated pets in a single query (if any)
      if (findOwner.pets && findOwner.pets.length > 0) {
        const petIds = findOwner.pets.map(pet => pet.id);
        await this.petRepository.delete(petIds);
      }

      // Delete the owner
      await this.ownerRepository.delete(id);

      return `Owner with id=${id} deleted successfully`;
    } catch (error) {
      // Handle errors gracefully
      throw new Error(`Failed to delete owner with id=${id}: ${error.message || error}`);
    }
  }


  //----------------------------------------
  //------------Delete Owners---------------
  //----------------------------------------
  async removeAll(): Promise<string> {
    try {
      await this.ownerRepository.clear()
      return `All Owners Deleted Successfully`;
    } catch (error) {
      throw error.message
    }
  }
}
