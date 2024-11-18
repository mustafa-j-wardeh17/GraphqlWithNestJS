import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // To make the entity inside pg db
@ObjectType() // to contact with graphql resolvers will
export class Pet {
  @PrimaryGeneratedColumn()
  @Field(type => Int) // Scalar type for graphql: Int to make id as int number style
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true }) // you still have to make this graphql nullable to make property optional
  type?: string;
}
