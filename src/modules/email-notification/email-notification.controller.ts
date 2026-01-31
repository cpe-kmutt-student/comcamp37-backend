import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "src/common/guards/admin.guard";
import { StaffGuard } from "src/common/guards/staff.guard";
import { EmailService } from "src/core/email/email.service";
import { AnnouncementEmailDto, ContentIssueEmailDto, TrackingEmailDto } from "./dto/email-notification.dto";
import { EmailNotificationService } from "./email-notification.service";

@ApiTags("Email Notification")
@Controller("/api/email/notification")
export class EmailNotificationController {
	constructor(private readonly emailNotificationService: EmailNotificationService) {}

	@Post("/announce")
	@UseGuards(AdminGuard)
	@ApiOperation({
		description: "Send announcement email to a user (Admin only)",
	})
	@ApiBody({
		type: AnnouncementEmailDto,
	})
	@ApiResponse({
		status: 201,
		description: "Successfully sent announcement email",
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	announcement(@Body() announcementEmailDto: AnnouncementEmailDto) {
		return this.emailNotificationService.sendAnnouncement(announcementEmailDto.email, announcementEmailDto.name);
	}

	@Post("/registration-confirm")
	@UseGuards(AdminGuard)
	@ApiOperation({
		description: "Send registration confirmation email to a user (Admin only)",
	})
	@ApiBody({
		type: AnnouncementEmailDto,
	})
	@ApiResponse({
		status: 201,
		description: "Successfully sent registration confirmation email",
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	registrationConfirm(@Body() announcementEmailDto: AnnouncementEmailDto) {
		return this.emailNotificationService.sendRegistrationConfirm(announcementEmailDto.email, announcementEmailDto.name);
	}

	@Post("/content-issue")
	@UseGuards(AdminGuard)
	@ApiOperation({
		description: "Send content issue notification email to a user (Admin only)",
	})
	@ApiBody({
		type: ContentIssueEmailDto,
	})
	@ApiResponse({
		status: 201,
		description: "Successfully sent content issue email",
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	contentIssue(@Body() contentIssueEmailDto: ContentIssueEmailDto) {
		return this.emailNotificationService.sendContentIssue(contentIssueEmailDto.email, contentIssueEmailDto.name, contentIssueEmailDto.detail, contentIssueEmailDto.deadline);
	}

	@Post("/tracking")
	@UseGuards(AdminGuard)
	@ApiOperation({
		description: "Send tracking information email to a user (Admin only)",
	})
	@ApiBody({
		type: TrackingEmailDto,
	})
	@ApiResponse({
		status: 201,
		description: "Successfully sent tracking email",
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	tracking(@Body() trackingEmailDto: TrackingEmailDto) {
		return this.emailNotificationService.sendTracking(trackingEmailDto.email, trackingEmailDto.name, trackingEmailDto.application_id, trackingEmailDto.tracking_number, trackingEmailDto.provider);
	}
}
