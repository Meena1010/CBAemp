import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HrModule } from './hr/hr.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [HrModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
