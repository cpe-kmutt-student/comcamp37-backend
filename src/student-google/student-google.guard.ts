import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class StudentGoogleGuard extends AuthGuard("google") {}
