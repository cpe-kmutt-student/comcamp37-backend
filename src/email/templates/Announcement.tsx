import { Body, Button, Container, Font, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";

interface AnnouncementEmailProps {
	name: string;
}

const CONFIG = {
	resultLink: "https://comcamp.io/result",
	contactLink: "https://comcamp.io/#contact",
	email: "kmutt.comcamp@gmail.com",
};

export default function AnnouncementEmail({ name }: AnnouncementEmailProps) {
	return (
		<Html>
			<Tailwind
				config={{
					theme: {
						extend: {
							colors: {
								zootopia: {
									navy: "#464f6a",
									blue: "#92a6d2",
									orange: "#e98d55",
									yellow: "#f2d575",
									brown: "#504039",
								},
							},
						},
					},
				}}
			>
				<Head>
					<Font fontFamily="Helvetica" fallbackFontFamily="Arial" fontWeight={400} fontStyle="normal" />
				</Head>
				<Preview>ประกาศผลการคัดเลือก ComCamp 37</Preview>

				<Body className="bg-white font-sans">
					<Container className="mx-auto w-full max-w-[800px] my-10 bg-white rounded-2xl overflow-hidden shadow-lg">
						<Section className="relative overflow-hidden px-12 pt-12 pb-8 text-center" style={{ background: "linear-gradient(135deg, #464f6a 0%, #92a6d2 100%)" }}>
							<Img src="https://comcamp.io/_next/image?url=%2Fstatic%2Fimage%2Flogo.png&w=1200&q=75" width="180" height="auto" alt="ComCamp 37 Logo" className="mx-auto mb-6 mt-6 relative z-10" />

							<Heading className="text-white text-3xl font-bold m-0 relative z-10" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
								ประกาศผลการคัดเลือก
							</Heading>
							<Text className="text-3xl text-[#f2d575] font-bold m-0 relative z-10 leading-tight">COMCAMP 37</Text>
							{/* 
							<Text className="text-4xl font-bold m-0 relative z-10 leading-tight">
								<span className="text-[#FFFFFF]">COM</span>
								<span className="text-[#fc6f23]">C</span>
								<span className="text-[#edea34]">AM</span>
								<span className="text-[#fc6f23]">P</span>
								<span className="text-[#fc6f23]">3</span>
								<span className="text-[#edea34]">7</span>
							</Text>
							*/}
						</Section>

						<Section className="px-6 py-10">
							<Section className="bg-[#f8f9fc] border-l-4 border-[#e98d55] rounded-lg px-6 py-5 mb-8">
								<Text className="text-base leading-relaxed text-[#464f6a] m-0">
									สวัสดีครับน้อง <strong className="text-[#504039]">{name}</strong> 🎉
								</Text>
							</Section>

							<Text className="text-base leading-relaxed text-[#504039] mb-6">ขอขอบคุณที่ให้ความสนใจสมัครเข้าร่วมโครงการ ComCamp 37 ขณะนี้ทางค่ายได้ทำการประมวลผลการคัดเลือกเสร็จสิ้นเรียบร้อยแล้ว น้องสามารถตรวจสอบสถานะการคัดเลือกได้โดยกดที่ปุ่มด้านล่างครับ</Text>

							<Section className="text-center my-9">
								<Button
									className="inline-block text-[#504039] text-base font-bold px-12 py-4 rounded-full no-underline tracking-wide"
									style={{
										background: "linear-gradient(135deg, #e98d55 0%, #f2d575 100%)",
										boxShadow: "0 4px 16px rgba(233, 141, 85, 0.3)",
									}}
									href={CONFIG.resultLink}
								>
									ตรวจสอบสถานะการคัดเลือก
								</Button>

								<Text className="text-[13px] text-[#92a6d2] mt-4 mb-0 italic">*กรุณาตรวจสอบและยืนยันสิทธิ์ภายในเวลาที่กำหนด</Text>
							</Section>

							<Section className="bg-[#fff8f0] border-2 border-dashed border-[#f2d575] rounded-xl px-5 py-5 mt-8">
								<Text className="text-sm leading-relaxed text-[#504039] text-center m-0">
									<strong>หมายเหตุ:</strong> หากพบปัญหาในการเข้าถึงผลการคัดเลือก กรุณาติดต่อทีมงานผ่านช่องทางด้านล่าง
								</Text>
							</Section>
						</Section>

						<Section className="bg-[#f8f9fc] px-6 py-10 border-t border-[#e8ecf4]">
							<Img src="https://res.cloudinary.com/dynrld3nm/image/upload/cc36preorder/kmutt-cpe-logo_lyyokm.png" width="144" height="80" alt="KMUTT CPE Logo" className="mb-5" />

							<Text className="text-[13px] leading-relaxed text-[#92a6d2] mb-6">
								© 2026 ComCamp 37. Computer Engineering Department,
								<br />
								King Mongkut&apos;s University of Technology Thonburi,
								<br />
								126 Pracha Uthit Rd, Bang Mot, Thung Khru, Bangkok 10140
							</Text>

							<Section className="border-t border-[#e8ecf4] pt-6 text-center">
								<Text className="text-[13px] leading-relaxed text-[#92a6d2] m-0">
									อีเมลฉบับนี้ถูกส่งโดยระบบอัตโนมัติ โปรดอย่าตอบกลับ
									<br />
									หากมีข้อสงสัยสามารถติดต่อทีมงานได้ที่{" "}
									<Link href={`mailto:${CONFIG.email}`} className="text-[#e98d55] no-underline font-semibold">
										{CONFIG.email}
									</Link>{" "}
									หรือ{" "}
									<Link href={CONFIG.contactLink} className="text-[#e98d55] no-underline font-semibold">
										ช่องทางต่อไปนี้
									</Link>
								</Text>
							</Section>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
