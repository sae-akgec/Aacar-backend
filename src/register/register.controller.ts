import { Controller, Post, Body, NotAcceptableException } from '@nestjs/common';

import { RegisterService } from './register.service';

@Controller('register')
export class registrationController {
    constructor(private readonly registerService: RegisterService) { }

    @Post()
    async register(
        @Body('name') name: string,
        @Body('phoneNumber') phoneNumber: number,
        @Body('studentNumber') studentNumber: number,
        @Body('interest') interest: string,
        @Body('email') email: string,
        @Body('branch') branch: string,
    ) {
        await this.registerService.validateInput(studentNumber);
        console.log('Validation Successful');
        await this.registerService.registerStudent(name, phoneNumber, studentNumber, interest, email, branch);
        console.log('Added successfully');
        await this.registerService.sendMail(email, studentNumber);
        console.log('Mail sent');
    }
}