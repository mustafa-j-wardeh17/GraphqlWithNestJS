import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreatePetInput {
  @IsAlpha() //string contains only letters (a-zA-Z)
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;
}
