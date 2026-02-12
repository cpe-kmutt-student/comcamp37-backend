import { Injectable, InternalServerErrorException } from "@nestjs/common";
import schools from "../../data/schools.json";

@Injectable()
export class UtilService {
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
			throw new InternalServerErrorException(e);
		}
	}
}
