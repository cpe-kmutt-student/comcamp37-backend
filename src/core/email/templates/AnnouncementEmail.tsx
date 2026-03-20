import { Body, Button, Container, Font, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

interface AnnouncementEmailProps {
	name: string;
}

const CONFIG = {
	resultLink: "https://comcamp.io/",
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
				<Preview>🎉สิ้นสุดการรอคอย! ประกาศผลการคัดเลือกผู้เข้าร่วมค่าย Comcamp 37</Preview>

				<Body className="bg-white font-sans">
					<Container className="mx-auto w-full max-w-[800px] my-10 bg-white rounded-2xl overflow-hidden shadow-lg">
						<Header />

						<Section className="bg-white px-6 py-8 text-center">
							<Text className="text-sm font-semibold text-[#92a6d2] m-0 mb-2 tracking-widest uppercase">COMCAMP 37</Text>
							<Heading className="text-2xl font-bold m-0 text-[#464f6a]">🎉 สิ้นสุดการรอคอย! ประกาศผลการคัดเลือกผู้เข้าร่วมค่าย Comcamp 37</Heading>
						</Section>

						<Section className="px-6 pt-4 pb-10">
							<Section className="">
								<Text className="text-base leading-relaxed m-0">สวัสดีครับ/ค่ะ น้อง {name}</Text>
							</Section>

							<Section className="">
								<Text className="text-base leading-relaxed mb-6">ในนามของคณะกรรมการและทีมงานค่าย Comcamp 37 พวกเราขอขอบคุณน้องๆ ทุกคนที่ให้ความสนใจและตั้งใจทำใบสมัครส่งเข้ามากันอย่างล้นหลามเกินความคาดหมายครับ</Text>
								<Text className="text-base leading-relaxed mb-6">ในปีนี้มีผู้สมัครที่มีศักยภาพและความสามารถโดดเด่นมากมาย ทำให้คณะกรรมการของเราต้องใช้เวลาพิจารณากันอย่างหนักและรอบคอบที่สุด เพื่อคัดเลือกผู้ที่จะได้มาร่วมเดินทางและสร้างประสบการณ์ดีๆ ไปด้วยกันในค่ายครั้งนี้</Text>
								<Text className="text-base leading-relaxed mb-6">และแล้วก็ถึงเวลาที่ทุกคนรอคอย! ตอนนี้ผลการคัดเลือกอย่างเป็นทางการได้ประกาศออกมาเรียบร้อยแล้วครับ น้องๆ สามารถเข้าไปตรวจสอบผลการคัดเลือกของตัวเองได้ที่ลิงก์ด้านล่างนี้เลยครับ</Text>
							</Section>

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

								{/*<Text className="text-[13px] text-[#92a6d2] mt-4 mb-0 italic">
                  *กรุณาตรวจสอบและยืนยันสิทธิ์ภายในเวลาที่กำหนด
                </Text>*/}
							</Section>

							<Section className="">
								<Text className="m-0 text-xl">
									📅 <b>กำหนดการ :</b>
								</Text>
								<Text className="text-sm leading-relaxed text-[#504039] m-0">
									<b>21 มีนาคม 2569 :</b> ประกาศผลการคัดเลือก
								</Text>
								<Text className="text-sm leading-relaxed text-[#504039] m-0">
									<b>22 มีนาคม 2569 :</b> วันสุดท้ายของการกดยืนยันสิทธิ์ (23.59 น.)
								</Text>
								<Text className="text-sm leading-relaxed text-[#504039] m-0">
									<b>23 มีนาคม 2569 :</b> ประกาศเรียกตัวสำรอง
								</Text>
								<Text className="text-sm leading-relaxed text-[#504039] m-0">
									<b>8 - 12 เมษายน 2569 :</b> วันจัดค่าย Comcamp 37
								</Text>
							</Section>

							<Section className="mt-6">
								<Text className="text-sm leading-relaxed text-[#504039] m-0">หากน้องๆ มีคำถามเพิ่มเติม พบปัญหาในการเข้าใช้งานเว็บไซต์ หรือมีข้อสงสัยเกี่ยวกับการยืนยันสิทธิ์ สามารถติดต่อสอบถามพี่ๆ ทีมงานได้ทันทีผ่านช่องทางต่อไปนี้:</Text>
								<Text>
									<strong>Facebook:</strong> Comcamp KMUTT
									<br />
									<strong>Instagram:</strong> comcamp.kmuttt
									<br />
									<strong>TikTok:</strong> comcamp.kmutt
								</Text>
							</Section>

							<Section>
								<Text>
									<strong>เบอร์โทรศัพท์ติดต่อ</strong>
								</Text>
								<Text>
									พี่โดนัท : 093 370 7960
									<br />
									พี่เกน : 062 594 1597
									<br />
									พี่กร : 093 529 9514
									<br />
									พี่ไทม์ : 098 287 0453
								</Text>
							</Section>
							<Text className="text-sm text-center m-0 mt-6">ขอบคุณน้องๆ อีกครั้งที่มาร่วมเป็นส่วนหนึ่งของความทรงจำในครั้งนี้ แล้วพบกันนะครับ!</Text>
						</Section>

						<Footer />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
