import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { LoggerService } from "src/core/logger/logger.service";
import schools from "../../data/schools.json";

@Injectable()
export class UtilService {
	constructor(private readonly logger: LoggerService) {}

	async getSchools(query?: string) {
		try {
			if (!query) {
				return schools.slice(0, 4);
			}

			const cleanQuery = query
				.replace(/^(โรงเรียน|รร\.?)/g, "")
				.trim()
				.toLowerCase();

			const filtered = schools.filter((name: string) => name.toLowerCase().includes(cleanQuery)).slice(0, 4);

			return filtered;
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException(e);
		}
	}
}
