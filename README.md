# NestJS GraphQL Example Project
Welcome to the NestJS GraphQL Example Project! This project demonstrates how to set up and use GraphQL with NestJS, including database integration using TypeORM, entity creation, and implementing resolvers for queries and mutations. It provides a structured, scalable foundation for building GraphQL APIs.

---
### What is GraphQL?
GraphQL is a query language and runtime for APIs that enables clients to request only the data they need. Unlike traditional REST APIs, which require multiple endpoints, GraphQL uses a single endpoint to handle all operations. Key features of GraphQL include:

- **Flexible Data Retrieval**: Clients can fetch multiple resources in a single request.
- **Strongly Typed Schema**: A schema defines the structure and types of your API, offering robust type-checking and self-documentation.
- **Real-Time Updates**: Supports subscriptions for real-time data updates.

---
### Project Overview
This project demonstrates:

- Setting up NestJS with GraphQL using the Apollo Driver.
- Using TypeORM for database interactions.
- Creating and linking entities for GraphQL queries and mutations.
- Defining resolvers for GraphQL operations.
---
### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-repo/nestjs-graphql-example.git
cd nestjs-graphql-example
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run start:dev
```
4. Access the GraphQL playground at `http://localhost:3000/graphql`.

##
### Connecting NestJS with GraphQL
Here’s a minimal setup for integrating GraphQL with NestJS:
```typescript
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Code-first approach
    }),
  ],
})
export class AppModule {}
```
<br/>

**Explanation:**
1. **GraphQLModule**: Configures GraphQL in the application.
2. **ApolloDriver**: Provides Apollo Server integration.
3. **autoSchemaFile**: Automatically generates a schema file from your code.

##

### Database Integration
To work with a database, entities are created using **TypeORM** and mapped to GraphQL types.
Example Entity: `Owner`
```typescript
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Pet } from 'src/pets/entities/pet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  @Field(() => [Pet], { nullable: true })
  pets?: Pet[];
}
```
<br/>

**Key Points:**
1. **@Entity**: Maps the class to a database table.
2. **@ObjectType**: Marks the class as a GraphQL type.
3. **@Field**: Maps class properties to GraphQL fields.
##

### Resolvers in GraphQL
In GraphQL, resolvers replace controllers to handle queries and mutations.

Example Resolver: `OwnersResolver`

```typescript
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Query(() => [Owner])
  owners(): Promise<Owner[]> {
    return this.ownersService.findAll();
  }

  @Query(() => Owner)
  getOwner(@Args('id', { type: () => Int }) id: number): Promise<Owner> {
    return this.ownersService.findOne(id);
  }

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput): Promise<Owner> {
    return this.ownersService.create(createOwnerInput);
  }
}
```
<br/>

**Key Points:**
1. **@Resolver**: Marks the class as a GraphQL resolver.
2. **@Query**: Defines a query operation.
3. **@Mutation**: Defines a mutation operation.
4. **@Args**: Specifies arguments for queries or mutations.
##

### Modules in NestJS
Modules organize application features. The `OwnersModule` demonstrates how to link entities and services with resolvers:
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
import { Owner } from './entities/owner.entity';
import { Pet } from 'src/pets/entities/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Pet])],
  providers: [OwnersResolver, OwnersService],
})
export class OwnersModule {}
```
##

### Service Layer
Services implement the business logic. Example service for `Owner`:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { Pet } from 'src/pets/entities/pet.entity';
import { CreateOwnerInput } from './dto/create-owner.input';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  findAll(): Promise<Owner[]> {
    return this.ownerRepository.find({ relations: ['pets'] });
  }

  findOne(id: number): Promise<Owner> {
    return this.ownerRepository.findOne({ where: { id }, relations: ['pets'] });
  }

  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const owner = this.ownerRepository.create(createOwnerInput);
    return this.ownerRepository.save(owner);
  }
}
```
<br/>

**Key Points:**
1. **@InjectRepository**: Injects a TypeORM repository.
2. **findAll()**: Fetches all owners with their pets.
3. **create()**: Creates a new owner with pets.

##

### **Conclusion**
This project highlights how to build scalable, type-safe GraphQL APIs with NestJS and TypeORM. With clear organization of modules, services, entities, and resolvers, it serves as an excellent starting point for your GraphQL applications.

Feel free to contribute, and happy coding! 🚀