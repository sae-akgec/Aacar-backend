import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { registerModule } from './register/register.module';
import { MongoURI } from '../config.js';

@Module({
  imports: [registerModule, MongooseModule.forRoot(MongoURI)],
  controllers: [],
  providers: [],
})
export class AppModule { }
