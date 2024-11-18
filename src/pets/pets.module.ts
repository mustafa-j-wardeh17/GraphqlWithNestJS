import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { Pet } from './entities/pet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet,Owner]),
  ],
  providers: [PetsResolver, PetsService],
})
export class PetsModule {}
