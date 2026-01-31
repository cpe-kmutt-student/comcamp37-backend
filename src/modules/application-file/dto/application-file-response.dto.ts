import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { FileType } from "../../../../generated/prisma/enums";

export class ApplicationFileResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiPropertyOptional({ description: "Original file name", example: "photo.jpg" })
	std_file_originalname?: string;

	@ApiPropertyOptional({ description: "File MIME type", example: "image/jpeg" })
	std_file_mimetype?: string;

	@ApiPropertyOptional({ description: "File encoding", example: "7bit" })
	std_file_encoding?: string;

	@ApiPropertyOptional({ description: "File size in bytes", example: 102400 })
	std_file_size?: number;

	@ApiProperty({ description: "File key/identifier", example: "files/abc123.jpg" })
	std_file_key: string;

	@ApiProperty({ description: "File type", enum: FileType, example: "file_face" })
	std_file_type: FileType;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}

export class ApplicationFileUploadResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	application_id: string;

	@ApiPropertyOptional({ description: "Original file name", example: "photo.jpg" })
	file_originalname?: string;

	@ApiPropertyOptional({ description: "File size in bytes", example: 102400 })
	file_size?: number;

	@ApiProperty({ description: "Signed URL for file access", example: "https://s3.amazonaws.com/..." })
	file_url: string;

	@ApiProperty({ description: "File type", enum: FileType, example: "file_face" })
	file_type: FileType;

	@ApiProperty({ description: "Created at timestamp" })
	craeted_at: Date;
}

export class ApplicationFileByTypeResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	application_id: string;

	@ApiPropertyOptional({ description: "Original file name", example: "photo.jpg" })
	file_originalname?: string;

	@ApiPropertyOptional({ description: "File size in bytes", example: 102400 })
	file_size?: number;

	@ApiProperty({ description: "Signed URL for file access", example: "https://s3.amazonaws.com/..." })
	file_url: string;

	@ApiProperty({ description: "File type", enum: FileType, example: "file_face" })
	file_type: FileType;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;
}
