import { IsAlpha } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class OwnerInput {
    @IsAlpha() //string contains only letters (a-zA-Z)
    @Field()
    name: string;

    @Field(type => Int)
    ownerId: number;
}
