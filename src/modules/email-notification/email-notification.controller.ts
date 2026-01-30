import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AdminGuard } from "src/common/guards/admin.guard";
import { StaffGuard } from "src/common/guards/staff.guard";
import { EmailService } from "src/core/email/email.service";
import { AnnouncementEmailDto, ContentIssueEmailDto, TrackingEmailDto } from "./dto/email-notification.dto";
import { EmailNotificationService } from "./email-notification.service";

@Controller("/api/email/notification")
export class EmailNotificationController {
	constructor(private readonly emailNotificationService: EmailNotificationService) {}

	@Post("/announce")
	@UseGuards(AdminGuard)
	announcement(@Body() announcementEmailDto: AnnouncementEmailDto) {
		return this.emailNotificationService.sendAnnouncement(announcementEmailDto.email, announcementEmailDto.name);
	}

	@Post("/registration-confirm")
	@UseGuards(AdminGuard)
	registrationConfirm(@Body() announcementEmailDto: AnnouncementEmailDto) {
		return this.emailNotificationService.sendRegistrationConfirm(announcementEmailDto.email, announcementEmailDto.name);
	}

	@Post("/content-issue")
	@UseGuards(AdminGuard)
	contentIssue(@Body() contentIssueEmailDto: ContentIssueEmailDto) {
		return this.emailNotificationService.sendContentIssue(contentIssueEmailDto.email, contentIssueEmailDto.name, contentIssueEmailDto.detail, contentIssueEmailDto.deadline);
	}

	@Post("/tracking")
	@UseGuards(AdminGuard)
	tracking(@Body() trackingEmailDto: TrackingEmailDto) {
		return this.emailNotificationService.sendTracking(trackingEmailDto.email, trackingEmailDto.name, trackingEmailDto.application_id, trackingEmailDto.tracking_number, trackingEmailDto.provider);
	}
}
