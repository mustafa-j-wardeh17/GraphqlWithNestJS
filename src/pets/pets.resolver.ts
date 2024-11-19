import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pet.entity';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) { }

  //----------------------------------------
  //---------------Get Pets-----------------
  //----------------------------------------
  @Query(() => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }



  //----------------------------------------
  //---------------Get Pet------------------
  //----------------------------------------
  @Query(() => Pet)
  getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOne(id)
  }


  //----------------------------------------
  //-------------Create Pet-----------------
  //----------------------------------------
  @Mutation(() => Pet)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
    return this.petsService.createPet(createPetInput)
  }


  //----------------------------------------
  //-------------Update Pet-----------------
  //----------------------------------------
  @Mutation(() => Pet)
  updatePet(@Args('updatePet') updatePet: UpdatePetInput): Promise<Pet> {
    return this.petsService.updatePet(updatePet)
  }


  //----------------------------------------
  //-------------Delete Pet-----------------
  //----------------------------------------
  @Mutation(() => String)
  async deletePet(@Args('id', { type: () => Int }) id: number): Promise<string> {
    return this.petsService.deleteOne(id)
  }


  //----------------------------------------
  //----------Delete All Pets---------------
  //----------------------------------------
  @Mutation(() => String)
  async deletePets(): Promise<string> {
    return this.petsService.deleteAll()
  }
}
