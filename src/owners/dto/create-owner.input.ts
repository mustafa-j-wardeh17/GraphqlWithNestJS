import { InputType, Int, Field } from '@nestjs/graphql';
import { Pet } from 'src/pets/entities/pet.entity';

@InputType()
export class CreateOwnerInput {
  @Field()
  name: string;

  @Field(type => Int)
  ownerId: number;

  @Field(type => [Pet], { nullable: true })
  pets?: Pet[]
}
