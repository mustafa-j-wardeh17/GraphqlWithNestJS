import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
import { OwnerInput } from './owner-input';

@InputType()
export class CreatePetInput {
  @IsAlpha() //string contains only letters (a-zA-Z)
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field(type => OwnerInput, { nullable: true })
  owner?: OwnerInput
}
