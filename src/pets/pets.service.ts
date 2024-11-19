import { Injectable, NotFoundException } from '@nestjs/common';
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


  //----------------------------------------
  //-------------Create Pet-----------------
  //----------------------------------------
  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    let newPet: Pet;

    // Check if the ownerId is provided and try to find the owner
    if (createPetInput.owner && createPetInput.owner.ownerId) {
      const findOwner = await this.ownerRepository.findOne({
        where: { ownerId: createPetInput.owner.ownerId }
      });

      if (findOwner) {
        // If owner is found, associate the owner with the new pet
        newPet = this.PetRpository.create({
          ...createPetInput,
          owner: findOwner
        });
      } else {
        // Handle the case where the owner is not found (optional based on your use case)
        throw new Error(`Owner with ownerId ${createPetInput.owner.ownerId} not found`);
      }
    } else {
      // If no ownerId is provided, create the pet without an owner
      newPet = this.PetRpository.create({
        name: createPetInput.name,
        type: createPetInput.type,
      });
    }

    // Save and return the new pet
    return await this.PetRpository.save(newPet);
  }


  //----------------------------------------
  //---------------Get Pets-----------------
  //----------------------------------------
  async findAll(): Promise<Pet[]> {
    return this.PetRpository.find({
      relations: ['owner']
    })
  }


  //----------------------------------------
  //---------------Get Pet------------------
  //----------------------------------------
  async findOne(id: number): Promise<Pet> {
    return this.PetRpository.findOne({
      where: {
        id
      },
      relations: ['owner']
    })
  }


  //----------------------------------------
  //-------------Update Pet-----------------
  //----------------------------------------
  async updatePet(updatePetInput: UpdatePetInput): Promise<Pet> {
    try {
      let updatedPet: Pet;

      const findPet = await this.PetRpository.findOne({
        where: { id: updatePetInput.id },
        relations:['owner']
      });

      if (!findPet) {
        // Throw an error if the pet is not found
        throw new Error(`Pet with id ${updatePetInput.id} not found`);
      }

      updatedPet = await this.PetRpository.preload({
        id: updatePetInput.id,
        ...findPet,
        ...updatePetInput,
      });

      if (!updatedPet) {
        throw new Error(`Pet with id ${updatePetInput.id} not found`);
      }

      return await this.PetRpository.save(updatedPet);
    } catch (error) {
      throw new Error(`Failed to update pet: ${error.message}`);
    }
  }


  //----------------------------------------
  //-------------Delete Pet-----------------
  //----------------------------------------
  async deleteOne(id: number): Promise<string> {
    try {
      const findPet = await this.PetRpository.findOne({ where: { id } })
      if (findPet) {
        const deletePet = await this.PetRpository.delete(id)
        return `Pet with id=${id} deleted successfully`
      }
      throw new NotFoundException(`Pet with id=${id} doesn't found`)
    } catch (error) {
      throw error.message
    }
  }


  //----------------------------------------
  //----------Delete All Pets---------------
  //----------------------------------------
  async deleteAll(): Promise<string> {
    try {
      const deleteAllPets = await this.PetRpository.clear()
      return `All Pets Deleted Successfully`
    } catch (error) {
      throw error.message
    }
  }
}
