import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DealsModule } from './deals/deals.module';
import { dbConfig } from './database/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DealsModule, TypeOrmModule.forRoot(dbConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
