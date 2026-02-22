import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { LoggerService } from "src/core/logger/logger.service";
import type Geography from "../../data/geography.json";
import geography from "../../data/geography.json";
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

	getAddressByPostal(postal?: string) {
		try {
			if (!postal) {
				return this.addressResFormat(geography.slice(0, 4));
			}

			const cleanQuery = postal
				.replace(/^(โรงเรียน|รร\.?)/g, "")
				.trim()
				.toLowerCase();

			const filtered = geography.filter((geo) => geo.postalCode.toString().includes(cleanQuery));

			return this.addressResFormat(filtered);
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException(e);
		}
	}

	private addressResFormat(geography: typeof Geography) {
		return geography.map((g) => {
			return {
				postal: g.postalCode,
				province: g.provinceNameTh,
				district: g.districtNameTh,
				subdistrict: g.subdistrictNameTh,
			};
		});
	}
}
