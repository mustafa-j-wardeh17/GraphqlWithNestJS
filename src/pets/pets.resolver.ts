import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) { }


  @Query(() => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Query(() => Pet)
  getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOne(id)
  }

  @Mutation(() => Pet)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
    return this.petsService.createPet(createPetInput)
  }

}
