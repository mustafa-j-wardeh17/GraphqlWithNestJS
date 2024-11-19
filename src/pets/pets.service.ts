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
    const newPet = this.PetRpository.create(createPetInput)
    return await this.PetRpository.save(newPet)
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
    const editPet = await this.PetRpository.preload({
      ...updatePetInput
    })
    return this.PetRpository.save(editPet)
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
      throw `Oops: Something went wrong!!`
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
      throw `Oops: Something went wrong!!`
    }
  }
}
