import { InputType, Int, Field } from '@nestjs/graphql';
import { Pet } from 'src/pets/entities/pet.entity';
import { PetInput } from './pet.input';

@InputType()
export class CreateOwnerInput {
  @Field()
  name: string;

  @Field(type => Int)
  ownerId: number;

  @Field(type => [PetInput], { nullable: true })
  pets?: PetInput[]
}


