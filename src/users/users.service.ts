import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
	helloWorld() {
		return {
			hello: "World",
		};
	}
}
