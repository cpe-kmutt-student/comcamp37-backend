import { Body, Button, Container, Font, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

interface ContentIssueEmailProps {
	name: string;
	issueDetail: string;
	deadline?: string;
}

const CONFIG = {
	editLink: "https://comcamp.io/edit-application",
};

export default function ContentIssueEmail({ name, issueDetail, deadline }: ContentIssueEmailProps) {
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
				<Preview>แจ้งเตือน: กรุณาแก้ไขข้อมูลใบสมัคร ComCamp 37</Preview>

				<Body className="bg-white font-sans">
					<Container className="mx-auto w-full max-w-[800px] my-10 bg-white rounded-2xl overflow-hidden shadow-lg">
						<Header />

						<Section className="bg-white px-6 py-8 text-center">
							<Heading className="text-sm font-semibold text-[#92a6d2] m-0 mb-2 tracking-widest uppercase" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
								COMCAMP 37
							</Heading>
							<Text className="text-2xl font-bold m-0 text-[#464f6a]">แจ้งเตือนการแก้ไขใบสมัคร❗</Text>
						</Section>

						<Section className="px-6 pb-10 pt-4">
							<Section className="bg-[#f8f9fc] border-l-4 border-[#e98d55] rounded-lg px-6 py-5 mb-8">
								<Text className="text-base leading-relaxed text-[#464f6a] m-0">
									สวัสดีครับน้อง <strong className="text-[#504039]">{name}</strong> 📝
								</Text>
							</Section>

							<Text className="text-base leading-relaxed text-[#504039] mb-6">ทางทีมงาน ComCamp 37 ได้ตรวจสอบใบสมัครของน้องแล้วพบว่ามีข้อมูลบางส่วนที่ต้องแก้ไข เพื่อให้การพิจารณาใบสมัครเป็นไปอย่างสมบูรณ์ กรุณาดำเนินการแก้ไขตามรายละเอียดด้านล่างครับ</Text>

							<Section className="bg-[#fff0e6] border-2 border-[#e98d55] rounded-xl px-6 py-6 mb-8">
								<Text className="text-sm font-bold text-[#e98d55] m-0 mb-2">⚠️ ปัญหาที่พบ:</Text>
								<Text className="text-base leading-relaxed text-[#504039] m-0">{issueDetail}</Text>
							</Section>

							<Section className="bg-[#fef3cd] border-l-4 border-[#f2d575] rounded-lg px-6 py-5 mb-8">
								<Text className="text-sm leading-relaxed text-[#504039] m-0">
									<strong>⏰ กำหนดแก้ไขภายใน:</strong> <span className="text-[#e98d55] font-bold">{deadline ? deadline : " ไม่ได้กำหนด"}</span>
								</Text>
								<Text className="text-sm leading-relaxed text-[#504039] m-0 mt-2">หากไม่ดำเนินการแก้ไขภายในเวลาที่กำหนด ใบสมัครจะไม่ถูกนำไปพิจารณาในรอบคัดเลือก</Text>
							</Section>

							<Section className="text-center my-9">
								<Button
									className="inline-block text-[#504039] text-base font-bold px-12 py-4 rounded-full no-underline tracking-wide"
									style={{
										background: "linear-gradient(135deg, #e98d55 0%, #f2d575 100%)",
										boxShadow: "0 4px 16px rgba(233, 141, 85, 0.3)",
									}}
									href={CONFIG.editLink}
								>
									แก้ไขใบสมัครของฉัน
								</Button>

								<Text className="text-[13px] text-[#92a6d2] mt-4 mb-0 italic">*กรุณาตรวจสอบความถูกต้องของข้อมูลก่อนบันทึก</Text>
							</Section>
						</Section>

						<Footer />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
