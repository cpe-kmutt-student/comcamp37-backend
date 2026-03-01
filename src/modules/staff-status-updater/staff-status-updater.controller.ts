import { Controller } from "@nestjs/common";
import { StaffStatusUpdaterService } from "./staff-status-updater.service";

@Controller("/api/staff/application/status/updater")
export class StaffStatusUpdaterController {
	constructor(private readonly staffStatusService: StaffStatusUpdaterService) {}
}
