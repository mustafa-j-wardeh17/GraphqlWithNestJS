import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from './owners/owners.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Code first methodology
      // typePaths: ['./**/*.graphql'], //For schema first
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: "myuser",
      database: 'mydatabase',
      password: "mypassword",
      port: 5433,
      autoLoadEntities: true,
      synchronize: true
    }),
    PetsModule,
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useClass: ValidationPipe
  }],
})
export class AppModule { }
