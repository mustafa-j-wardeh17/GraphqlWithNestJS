import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) { }

  @Query(() => [Owner])
  owners(): Promise<Owner[]> {
    return this.ownersService.findAll()
  }

  @Query(() => [Owner])
  getOwner(@Args('id', { type: () => Int }) id): Promise<Owner> {
    return this.ownersService.findOne(id)
  }
}
