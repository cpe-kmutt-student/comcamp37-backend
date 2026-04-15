import { Body, Button, Container, Font, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

const CONFIG = {
	resultLink: "https://line.me/ti/g2/gUcEmk63-LQH-ZIOsu4Hy8OiuOO4ChiOlqqI1g?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
	qrUrl: "https://storage.comcamp.io/public/IMG_0185.jpg",
};

export default function Nano() {
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
						<Header />

						<Section className="bg-white px-6 py-8 text-center">
							<Text className="text-sm font-semibold text-[#92a6d2] m-0 mb-2 tracking-widest">Technical Team of ComCamp 37</Text>
						</Section>

						<Section className="px-6 pt-4 pb-10">
							<Section className="">
								<Text className="text-base leading-relaxed m-0">สวัสดีนาโน ตัวปลอม (10^-9)</Text>
							</Section>

							<Section className="">
								<Text className="text-base leading-relaxed indent-16">
									ขอบคุณสำหรับ Mirror มากๆ เลย เสียเวลาชีวิตอ่านไปตั้ง 10 วิ 💀 อยากจะบอกว่าตอนครั้งเเรกเราก็คิดว่าเราจะคุยกับนาโนยังไงดี คือ เปิดรายชื่อ Staff มาเห็นเพื่อนตัวเองอย่างบูม หรือที่เลยคุยบ้าง เกีย ทีม จาชิง เเล้ว โชกุน ก็อยู่ภาคปกก็คงคุยด้วยไม่ยาก เเต่ พอเห็นว่ามี นาโน ที่อยู่ภาค
									Inter ด้วย ตอนนั้นก็ดันโดนโหวดเป็น Head อีก ก็ High Cortisol เลยทีงี้ เเล้วเราก็คุยกับเพศตรงข้ามไม่เก่งเลยด้วย จัดอยู่ใน Level ปาก 🐶 5555555 (อันนี้มีเพื่อนเคยบอกมาไม่ได้คิดเองน่ะ 555555) ก็นั่นเเหละ จนได้มีโอกาสเจอตัวจริงๆ ก็น่าจะวันซ้อมค่าย ล่ะมั้ง ก็ได้รู้ว่า
									นาโนก็เป็นคนหลุดๆ รั่วๆ ง่ายๆ ดี (ของเวฟในมือ) ก็เลยอาจจะ ลด Level ปากลงมาเรื่อยๆ บ้างก็บางอย่างบางคำถ้าไม่พอใจจริงๆ เราขอโทษด้วย เเต่เพราะอยากจะเพื่อให้เราได้คุยกันง่ายขึ้น 😅 อย่างเเรกเลยอยากจะขอบคุณเพื่อนมากๆ ที่เข้าทีมมา ทีมเรามีทั้งหมด 7 คน
									ซึ่งพอมาคิดดูเเล้วมันเเทบไม่พอเลยจริงๆ อยากขอบคุณมากๆ ที่อยู่จนค่ายสำเร็จไปได้ด้วยดี เราไม่อยากให้นาโนคิดนะว่า นาโนไม่ได้สำคัญกับทีม หากไม่ได้นาโนช่วยทดสอบ API ให้ตอนนี้ ตอนนี้ ข้อมูลน้องหลุดเกลี้ยง (ไปอ่านโค้ดชุดที่มีปัญหา เเล้วเจอว่าลืมใส่ Authen คั้นไว้ 💀)
									หรือถ้าบางอย่างเราทำให้นาโนรู้สึกไม่สบายใจเราก็ขอโทษด้วย (เป็น Head มือใหม่ 🥺) เราดีใจที่ได้รู้จักเหมือนกันนะ เเล้วก็หวังว่าเราจะได้ร่วมงานกันอีกนะ 🥳
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
