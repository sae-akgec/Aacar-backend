import { Injectable, NotAcceptableException, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';

import { Student } from './student.model';
import * as googleAuth from './google_auth';
import * as config from '../../config'

@Injectable()
export class RegisterService {
    constructor(
        @InjectModel('Students') private readonly studentModel: Model<Student>
    ) { }

    async validateInput(studentNumber: number) {
        const student = await this.studentModel.findOne({ "studentNumber": studentNumber }).exec();
        if (student) {
            throw new NotAcceptableException(`${student.name} is already registered`);
        }
    }

    async registerStudent(name: string, phoneNumber: number, studentNumber: number, interest: string, email: string, branch: string) {
        const student = new this.studentModel({
            name,
            phoneNumber,
            studentNumber,
            interest,
            email,
            branch
        });
        await student.save();
    }

    async sendMail(email: string, studentNumber: number) {
        const nodemailerSettings = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            service: 'Gmail',
            from: `"Sae-AKGEC" <${config.email}>`,

            auth: {
                type: 'OAuth2',
                user: config.email,
                clientId: googleAuth.credentials.web.client_id,
                clientSecret: googleAuth.credentials.web.client_secret,
                refreshToken: googleAuth.tokens.refresh_token,
                accessToken: googleAuth.tokens.access_token,
                expires: googleAuth.tokens.expiry_date
            }
        } as nodemailer.TransportOptions;
        const gmailTransport = nodemailer.createTransport(nodemailerSettings);
        await gmailTransport.sendMail({
            to: email,
            subject: 'Registration successful for Aacar',
            html: `Your registration process for Aacar was successfull`
        })
            .then(() => {
                return;
            })
            .catch(err => {
                this.studentModel.findOneAndDelete({ "studentNumber": studentNumber }).exec();
                throw new InternalServerErrorException(err);
            })
    }
}