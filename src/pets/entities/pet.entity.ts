import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Owner } from '../../owners/entities/owner.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(type => Owner, owner => owner.pets,{nullable:true})
  @Field(type => Owner,{nullable:true})
  owner?: Owner
}
