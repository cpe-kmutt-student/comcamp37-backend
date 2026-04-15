import { Body, Button, Container, Font, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

interface SendLinkOpenChatEmailProps {
	nickname: string;
	firstname: string;
	lastname: string;
}

const CONFIG = {
	resultLink: "https://line.me/ti/g2/gUcEmk63-LQH-ZIOsu4Hy8OiuOO4ChiOlqqI1g?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
	qrUrl: "https://storage.comcamp.io/public/IMG_0185.jpg",
};

export default function SendLinkOpenChat({ nickname, firstname, lastname }: SendLinkOpenChatEmailProps) {
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
				<Preview>💬 LINE Openchat สำหรับผู้เข้าร่วมค่าย ComCamp 37</Preview>

				<Body className="bg-white font-sans">
					<Container className="mx-auto w-full max-w-[800px] my-10 bg-white rounded-2xl overflow-hidden shadow-lg">
						<Header />

						<Section className="bg-white px-6 py-8 text-center">
							<Text className="text-sm font-semibold text-[#92a6d2] m-0 mb-2 tracking-widest">ComCamp 37</Text>
							<Heading className="text-2xl font-bold m-0 text-[#464f6a]">💬 LINE OpenChat สำหรับผู้เข้าร่วมค่าย ComCamp 37</Heading>
						</Section>

						<Section className="px-6 pt-4 pb-10">
							<Section className="">
								<Text className="text-base leading-relaxed m-0">สวัสดีครับ น้อง{nickname}</Text>
							</Section>

							<Section className="">
								<Text className="text-base leading-relaxed">ตอนนี้ ComCamp 37 มี Line OpenChat แล้วนะ!</Text>
								<Text className="text-base leading-relaxed mt-6">เพื่อไม่ให้พลาดข้อมูลข่าวสารต่าง ๆ ที่จะเกิดขึ้นตลอดระยะเวลาภายในค่าย พี่ ๆ ขอความร่วมมือให้น้อง ๆ เข้ากลุ่มไลน์ OpenChat นี้ด้วยนะครับ</Text>
								<Text className="text-base leading-relaxed mt-1">โดยน้อง ๆ ต้องตอบคำถามด้วยรูปแบบ ชื่อเล่น-ชื่อจริง-นามสกุล ของตัวเอง และตั้งชื่อในแชทตามรูปแบบด้านล่างนี้</Text>
							</Section>

							<Text className="text-center font-bold text-lg text-[#464f6a]">รูปแบบการตั้งชื่อ</Text>
							<Section className="bg-[black]/10 rounded-xl px-6 py-6 mb-8 mt-1 text-center">
								<Text className="text-xl font-bold text-[black] m-0 text-center">
									{nickname}_{firstname}
								</Text>
							</Section>

							<Text className="text-center font-bold text-lg text-[#464f6a]">รูปแบบการตอบคำถาม</Text>
							<Section className="bg-[black]/10 rounded-xl px-6 py-6 mb-8 mt-1 text-center">
								<Text className="text-xl font-bold text-[black] m-0 text-center">
									{nickname}-{firstname}-{lastname}
								</Text>
							</Section>

							<Section className="text-center my-9 mt-15">
								<Button
									className=" inline-block text-[white] text-base font-bold px-12 py-4 rounded-full no-underline tracking-wide"
									style={{
										background: "linear-gradient(135deg, #37e05b 0%, #37e05b 100%)",
										boxShadow: "0 4px 16px rgba(233, 141, 85, 0.3)",
									}}
									href={CONFIG.resultLink}
								>
									เข้าร่วม LINE Openchat เลย
								</Button>

								<Text className="text-base leading-relaxed my-5">หรือ</Text>
								<Text className="text-sm">เเสกน QR Code ด้านล่างนี้</Text>

								<Section>
									<Img src={CONFIG.qrUrl} style={{ width: "auto", height: "100%", maxHeight: "312px" }} alt="ComCamp 37 Logo" className="mx-auto relative z-10" />
								</Section>

								{/*<Text className="text-[13px] text-[#92a6d2] mt-4 mb-0 italic">
                  *กรุณาตรวจสอบและยืนยันสิทธิ์ภายในเวลาที่กำหนด
                </Text>*/}
							</Section>

							<Text className="text-sm text-center m-0 mt-6">แล้วมาพบกันในค่าย ComCamp 37 นะครับ 🫶🏻</Text>
						</Section>

						<Footer />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
