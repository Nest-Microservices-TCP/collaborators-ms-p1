import { Module } from '@nestjs/common';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { AreasModule } from './areas/areas.module';

@Module({
  imports: [CollaboratorsModule, AreasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
