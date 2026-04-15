import { Body, Button, Container, Font, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

const CONFIG = {
	resultLink: "https://line.me/ti/g2/gUcEmk63-LQH-ZIOsu4Hy8OiuOO4ChiOlqqI1g?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
	qrUrl: "https://storage.comcamp.io/public/IMG_0185.jpg",
};

export default function Ice() {
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
				<Preview>คือไรน้าาาา ลองเปิดดูสิ อิอิ</Preview>

				<Body className="bg-white font-sans">
					<Container className="mx-auto w-full max-w-[800px] my-10 bg-white rounded-2xl overflow-hidden shadow-lg">
						<Section>
							<Img src={"https://storage.comcamp.io/web-assets/1.png"} style={{ width: "auto", height: "100%", maxHeight: "500px" }} alt="ComCamp 37 Logo" className="mx-auto relative z-10" />
						</Section>

						<Section className="bg-white px-6 py-8 text-center">
							<Text className="text-sm font-semibold text-[#92a6d2] m-0 mb-2 tracking-widest">Academic Team of ComCamp 37</Text>
						</Section>

						<Section className="px-6 pt-4 pb-10">
							<Section className="">
								<Text className="text-base leading-relaxed m-0">สวัสดีไอซ์</Text>
							</Section>

							<Section className="">
								<Text className="text-base leading-relaxed indent-16">
									เรื่อง n8n ไม่เป็นไรเลย เราอยากจะ Support เพื่อนๆ เท่าที่เราทำให้ได้อยู่เเล้ว ยิ่งเห็นว่าฝ่ายวิชาการ ค่อนข้างวุ่นกันจัดๆ 5555555 มินมาบอกบ่อยๆ ว่าวิชาการงานเยอะมาก ไหนตรวจคำถามตั้ง 2 ชุดไหนเนื้อหาเตรียมสอน ไหนสไลด์สำหรับสอน ได้ยินเเล้วยังสยองงง 🥶 เเล้วก็ขอบคุณสำหรับ
									Mirror มากๆ เลย หวังว่า ModCom จะได้เจอกันอีกนะ เเละถ้าอยากให้ช่วยอะไรบอกได้เลยยย 🤩{" "}
								</Text>
							</Section>

							<Section className="mt-10">
								<Text className="text-end text-base leading-relaxed m-0">สวัสดีคอมเเคมป์</Text>
							</Section>
							<Text className="text-sm text-center m-0 mt-6">ขอบคุณที่ได้มาพบกันในค่าย ComCamp 37 นะ 🫶🏻</Text>
						</Section>

						<Footer />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
