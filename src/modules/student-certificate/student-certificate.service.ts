import path from "node:path";
import { Injectable } from "@nestjs/common";
import { createCanvas, loadImage, registerFont } from "canvas";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class StudentCertificateService {
	constructor(private readonly prisma: PrismaService) {}

	async certificatePreview() {}

	async generateImage(name: string): Promise<Buffer> {
		// Load background
		const bgPath = path.join(__dirname, "./certificate_template.png");
		const background = await loadImage(bgPath);

		// Register custom font
		const fontPath = path.join(__dirname, "./Arimo-VariableFont_wght.ttf");
		registerFont(fontPath, { family: "CustomFont" });

		// Create canvas
		const canvas = createCanvas(background.width, background.height);
		const ctx = canvas.getContext("2d");

		// Draw background
		ctx.drawImage(background, 0, 0);

		// Set font
		ctx.font = '40px "CustomFont"';
		ctx.fillStyle = "#000000";

		// Center text
		const textWidth = ctx.measureText(name).width;
		const x = (canvas.width - textWidth) / 2;
		const y = canvas.height / 2;

		// Draw name
		ctx.fillText(name, x, y);

		// Return image buffer
		return canvas.toBuffer("image/png");
	}
}
