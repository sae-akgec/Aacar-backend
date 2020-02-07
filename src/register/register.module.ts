import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RegisterService } from './register.service';
import { registrationController } from './register.controller';
import { StudentSchema } from './student.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Students', schema: StudentSchema }])
    ],
    controllers: [registrationController],
    providers: [RegisterService],
})

export class registerModule { }