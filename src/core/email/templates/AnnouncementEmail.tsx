import { Body, Button, Container, Font, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

interface AnnouncementEmailProps {
	name: string;
}

const CONFIG = {
	resultLink: "https://comcamp.io/result",
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
						<Header />

						<Section className="bg-white px-6 py-8 text-center">
							<Text className="text-sm font-semibold text-[#92a6d2] m-0 mb-2 tracking-widest uppercase">COMCAMP 37</Text>
							<Heading className="text-2xl font-bold m-0 text-[#464f6a]">ประกาศผลการคัดเลือก 🎉</Heading>
						</Section>

						<Section className="px-6 pt-4 pb-10">
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

						<Footer />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
