import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { config } from "src/config/app.config";
import { PrismaService } from "src/prisma/prisma.service";
import { S3Service } from "src/s3/s3.service";
// import { s3Client } from "src/s3/s3.client";
import { StatusUpdateService } from "src/status-update/status-update.service";
import { StudentStatusType } from "src/student-status/dto/student-status.dto";
import { StudentFileDto, StudentFileType } from "./dto/student-file.dto";

@Injectable()
export class StudentFileService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly statusUpdateService: StatusUpdateService,
		private readonly s3: S3Service,
	) {}

	async getAllFiles(userId: string) {
		// try {
		// 	const studentUploadFile = await this.prisma.studentFiles.findUnique({
		// 		where: {
		// 			std_user_id: userId,
		// 		},
		// 	});
		// 	return {
		// 		std_user_id: studentUploadFile?.std_user_id,
		// 		std_file_face: await this.signedUrl(studentUploadFile?.std_file_face),
		// 		std_file_national_id: await this.signedUrl(studentUploadFile?.std_file_national_id),
		// 		std_file_parent_permission: await this.signedUrl(studentUploadFile?.std_file_parent_permission),
		// 		std_file_pp_1: await this.signedUrl(studentUploadFile?.std_file_pp_1),
		// 		std_file_pp_7: await this.signedUrl(studentUploadFile?.std_file_pp_7),
		// 		std_file_slip: await this.signedUrl(studentUploadFile?.std_file_slip),
		// 		updated_at: studentUploadFile?.updated_at,
		// 	};
		// } catch (e) {
		// 	throw new InternalServerErrorException();
		// }
	}

	async uploadFile(userId: string, studentFileDto: StudentFileDto, file: Express.Multer.File) {
		// const key = `${Date.now()}-${encodeURI(file.originalname)}`;
		// try {
		// 	await this.s3
		// 		.send(
		// 			new PutObjectCommand({
		// 				Bucket: config.s3.bucket,
		// 				Key: key,
		// 				Body: file.buffer,
		// 				ContentType: file.mimetype,
		// 			}),
		// 		)
		// 		.catch((e) => console.log(e));
		// 	const studentFile = await this.prisma.studentFiles.findUnique({
		// 		where: {
		// 			std_user_id: userId,
		// 		},
		// 	});
		// 	if (!studentFile) {
		// 		await this.prisma.studentFiles.create({
		// 			data: {
		// 				std_user_id: userId,
		// 			},
		// 		});
		// 	}
		// 	const studentFileUpdate = await this.prisma.studentFiles.update({
		// 		where: {
		// 			std_user_id: userId,
		// 		},
		// 		data: {
		// 			std_file_face: studentFileDto.type === StudentFileType.FACE ? key : undefined,
		// 			std_file_national_id: studentFileDto.type === StudentFileType.NATIONAL_ID ? key : undefined,
		// 			std_file_parent_permission: studentFileDto.type === StudentFileType.PARENT_PERMISSION ? key : undefined,
		// 			std_file_pp_1: studentFileDto.type === StudentFileType.PP_1 ? key : undefined,
		// 			std_file_pp_7: studentFileDto.type === StudentFileType.PP_7 ? key : undefined,
		// 			std_file_slip: studentFileDto.type === StudentFileType.SLIP ? key : undefined,
		// 		},
		// 	});
		// 	// If all field have signed then update status true
		// 	// *** prevent slip ****
		// 	if (!!studentFileUpdate.std_file_face && !!studentFileUpdate.std_file_national_id && !!studentFileUpdate.std_file_parent_permission && !!studentFileUpdate.std_file_pp_1 && !!studentFileUpdate.std_file_pp_7) {
		// 		await this.statusUpdateService.update(userId, StudentStatusType.FILE_DONE, true);
		// 	}
		// 	// update for slip only
		// 	if (studentFileUpdate.std_file_slip) {
		// 		await this.statusUpdateService.update(userId, StudentStatusType.PAYMENT_SUCCESS, true);
		// 	}
		// 	return {
		// 		file_type: studentFileDto.type,
		// 		file_key: key,
		// 		file_url: await this.signedUrl(key),
		// 		updated_at: studentFileUpdate.updated_at,
		// 	};
		// } catch (e) {
		// 	throw new InternalServerErrorException();
		// }
	}

	async getByType(userId: string, type: StudentFileType) {
		// try {
		// 	const studentFile = await this.prisma.studentFiles.findUnique({
		// 		where: {
		// 			std_user_id: userId,
		// 		},
		// 		select: {
		// 			std_file_face: type === StudentFileType.FACE,
		// 			std_file_national_id: type === StudentFileType.NATIONAL_ID,
		// 			std_file_parent_permission: type === StudentFileType.PARENT_PERMISSION,
		// 			std_file_pp_1: type === StudentFileType.PP_1,
		// 			std_file_pp_7: type === StudentFileType.PP_7,
		// 			std_file_slip: type === StudentFileType.SLIP,
		// 		},
		// 	});
		// 	return {
		// 		file_type: type,
		// 		file_key: studentFile?.std_file_face || studentFile?.std_file_national_id || studentFile?.std_file_parent_permission || studentFile?.std_file_pp_1 || studentFile?.std_file_pp_7 || studentFile?.std_file_slip,
		// 		file_url: await this.signedUrl(studentFile?.std_file_face || studentFile?.std_file_national_id || studentFile?.std_file_parent_permission || studentFile?.std_file_pp_1 || studentFile?.std_file_pp_7 || studentFile?.std_file_slip),
		// 	};
		// } catch (e) {
		// 	throw new InternalServerErrorException();
		// }
	}

	async signedUrl(key: string | null | undefined): Promise<string | null> {
		if (!key) return null;
		return await getSignedUrl(
			this.s3,
			new GetObjectCommand({
				Bucket: config.s3.bucket,
				Key: key,
			}),
			{
				expiresIn: 30 * 60, // 30m
			},
		);
	}
}
