import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Pet } from 'src/pets/entities/pet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;


  @Column()
  @Field()
  name: string;

  @Column()
  @Field(type => Int)
  ownerId: number;

  @OneToMany(type => Pet, pet => pet.owner)
  @Field(type => [Pet], { nullable: true })
  pets?: Pet[]
}
