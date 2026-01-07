import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { config } from "src/config/app.config";
import { PrismaService } from "src/prisma/prisma.service";
import { s3Client } from "src/s3/s3.client";

@Injectable()
export class StudentFileService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllFiles(userId: string) {
        try {
            const studentUploadFile = await this.prisma.studentFiles.findUnique({
                where: {
                    std_user_id: userId,
                }
            });

            return {
                std_user_id: studentUploadFile?.std_user_id,
                std_file_face: await this.signedUrl(studentUploadFile?.std_file_face),
                std_file_national_id: await this.signedUrl(studentUploadFile?.std_file_national_id),
                std_file_parent_permission: await this.signedUrl(studentUploadFile?.std_file_parent_permission),
                std_file_pp_1: await this.signedUrl(studentUploadFile?.std_file_pp_1),
                std_file_pp_7: await this.signedUrl(studentUploadFile?.std_file_pp_7),
                updated_at: studentUploadFile?.updated_at,
            };
        }
        catch(e){
            throw new InternalServerErrorException();
        }
	}

	uploadFile(userId: string, file: Express.Multer.File) {}

	async signedUrl(key: string | null | undefined): Promise<string | null> {
		if (!key) return null;
		return await getSignedUrl(
			s3Client,
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
