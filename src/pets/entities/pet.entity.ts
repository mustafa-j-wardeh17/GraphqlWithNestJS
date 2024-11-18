import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()

export class Pet {
  @Field(type => Int) // Scalar type for graphql: Int to make id as int number style
  id: number;


  @Field()
  name: string;


  @Field({ nullable: true }) // you still have to make this graphql nullable to make property optional
  type?: string;
}
