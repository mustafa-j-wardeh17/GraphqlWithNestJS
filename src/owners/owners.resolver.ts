import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) { }

  //----------------------------------------
  //---------------Get Owners---------------
  //----------------------------------------
  @Query(() => [Owner])
  owners(): Promise<Owner[]> {
    return this.ownersService.findAll()
  }


  //----------------------------------------
  //---------------Get Owner----------------
  //----------------------------------------
  @Query(() => [Owner])
  getOwner(@Args('id', { type: () => Int }) id): Promise<Owner> {
    return this.ownersService.findOne(id)
  }


  //----------------------------------------
  //--------------Create Owner--------------
  //----------------------------------------
  @Mutation(() => Owner)
  async createOwner(
    @Args('createOwnerInput') createOwnerInput: CreateOwnerInput
  ): Promise<Owner> {
    return this.ownersService.create(createOwnerInput);
  }


  //----------------------------------------
  //-------------Update Owner---------------
  //----------------------------------------
  @Mutation(() => Owner)
  async updateOwner(
    @Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput
  ): Promise<string> {
    return this.ownersService.update(updateOwnerInput);
  }


  //----------------------------------------
  //-------------Delete Owner---------------
  //----------------------------------------
  @Mutation(() => String)
  async deleteOwner(
    @Args('id', { type: () => Int }) id: number
  ): Promise<string> {
    return this.ownersService.remove(id);
  }


  //----------------------------------------
  //------------Delete Owners---------------
  //----------------------------------------
  @Mutation(() => String)
  async deleteOwners(): Promise<string> {
    return this.ownersService.removeAll();
  }
}
