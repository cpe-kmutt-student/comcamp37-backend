import { Body, Button, Container, Font, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

const CONFIG = {
	resultLink: "https://line.me/ti/g2/gUcEmk63-LQH-ZIOsu4Hy8OiuOO4ChiOlqqI1g?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
	qrUrl: "https://storage.comcamp.io/public/IMG_0185.jpg",
};

export default function Shogun() {
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
								<Text className="text-base leading-relaxed m-0">สวัสดีโชกุน</Text>
							</Section>

							<Section className="">
								<Text className="text-base leading-relaxed indent-16">
									ขอบคุณสำหรับ Mirror มากๆ เลย เเละ อยากให้ได้ร่วมงานกันอีกนะ ครั้งนี้เตรียมงานค่อนข้างน้อยๆ มากกกกกกกกกๆๆๆ จริงๆ บางเรื่องเราอาจจะปัดๆ มารับเองบ้าง เเต่ก็เพื่อที่งานจะได้ตามกำหนดการ หวังว่าเพื่อนจะเข้าใจนะ 🥺 เเต่ถ้ามีงานหน้าอีก เเล้วโชกุนอยากร่วมทีมอีก
									เเละเราจัดสรรเวลาได้มากกว่านี้เราอาจจะจะสอน อะไรได้มากกว่านี้ให้ก็ได้นะ 😉 ยินดีมากเลยที่ได้โชกุนมาอยู่ในทีม เพราะไม่งั้นทีมเราคงทำอะไรไม่ Flow ขนาดนี้ โชกุนสำคัญต่อทีมเรามากนะ หวังว่าจะได้ร่วมงานกันอีก 🥳{" "}
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
