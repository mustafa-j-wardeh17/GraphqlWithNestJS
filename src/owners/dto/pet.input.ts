import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PetInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;
}
