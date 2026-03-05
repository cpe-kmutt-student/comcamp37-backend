import { Body, Container, Font, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

interface RegistrationConfirmEmailProps {
	name: string;
}

export default function RegistrationConfirmEmail({ name }: RegistrationConfirmEmailProps) {
	return (
		<Html>
			<Tailwind
				config={{
					theme: {
						extend: {
							colors: {
								zootopia: {
									navy: "#1d3071",
									blue: "#004aad",
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
				<Preview>ยืนยันการสมัคร ComCamp 37 สำเร็จ! 🎉</Preview>

				<Body className="bg-white font-sans">
					<Container className="mx-auto w-full max-w-[800px] my-10 bg-white rounded-2xl overflow-hidden shadow-lg">
						<Header />

						<Section className="bg-white px-6 py-8 text-center">
							<Heading className="text-sm font-semibold text-[#1d3071] m-0 mb-2 tracking-widest uppercase" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
								สถานะ
							</Heading>
							<Text className="text-2xl font-bold m-0 text-[#004aad]">ส่งใบสมัครสำเร็จ!</Text>
						</Section>

						<Section className="px-6 pb-10 pt-4">
							<Section className="bg-[#004aad]/20 border-l-4 border-[#1d3071] rounded-lg px-6 py-5 mb-8">
								<Text className="text-base leading-relaxed text-[#004aad] m-0">
									สวัสดีครับน้อง <strong className="text-[#504039]">{name}</strong>
								</Text>
							</Section>

							<Section className="bg-[#e8f5e9] border-2 border-[#4caf50] rounded-xl px-6 py-6 mb-8 text-center">
								<Text className="text-lg font-bold text-[#2e7d32] m-0">ใบสมัครของน้องได้รับการบันทึกเรียบร้อยแล้ว!</Text>
							</Section>

							<Text className="text-base leading-relaxed text-[#504039] mb-6">
								ขอขอบคุณที่ให้ความสนใจสมัครเข้าร่วมโครงการ <strong>ComCamp 37</strong> ค่ายคอมพิวเตอร์สำหรับน้อง ๆ ที่จัดโดยภาควิชาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
							</Text>

							<Section className="bg-[#f0f4ff] border-l-4 border-[#92a6d2] rounded-lg px-6 py-5 mb-8">
								<Text className="text-sm font-bold text-[#004aad] m-0 mb-3">📋 ขั้นตอนถัดไป:</Text>
								<Text className="text-sm leading-relaxed text-[#504039] m-0 mb-2">1. ทีมงานจะตรวจสอบใบสมัครของน้อง</Text>
								<Text className="text-sm leading-relaxed text-[#504039] m-0 mb-2">2. หากมีข้อมูลที่ต้องแก้ไข น้องจะได้รับอีเมลแจ้งเตือน</Text>
								<Text className="text-sm leading-relaxed text-[#504039] m-0 mb-2">3. ติดตามประกาศผลการคัดเลือกได้ที่เว็บไซต์ของค่าย</Text>
								<Text className="text-sm leading-relaxed text-[#504039] m-0">4. ตรวจสอบอีเมลเป็นประจำเพื่อไม่พลาดข่าวสารสำคัญ</Text>
							</Section>

							<Text className="text-base leading-relaxed text-[#504039] mb-6 text-center">
								พวกพี่ ๆ ทีมงาน ComCamp 37 รู้สึกตื่นเต้นที่จะได้พบกับน้อง ๆ
								<br />
								ขอให้โชคดีในการคัดเลือก! 🍀
							</Text>

							<Section className="text-center">
								<Text className="text-2xl m-0">🦊🐰🦁</Text>
							</Section>
						</Section>

						<Footer />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
