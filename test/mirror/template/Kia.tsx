import { Body, Button, Container, Font, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

const CONFIG = {
	resultLink: "https://line.me/ti/g2/gUcEmk63-LQH-ZIOsu4Hy8OiuOO4ChiOlqqI1g?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
	qrUrl: "https://storage.comcamp.io/public/IMG_0185.jpg",
};

export default function Kia() {
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
								<Text className="text-base leading-relaxed m-0">สวัสดีเกีย (Kia)</Text>
							</Section>

							<Section className="">
								<Text className="text-base leading-relaxed indent-16">
									ก็นึกว่าชื่อเกียเขียน Gear มาตลอด 555555 เคยไปหลอกถามบูมอยู่ว่างชื่อเกียเขียนยังไงก็ได้คำตอบเหมือกัน 55555 เอาเป็นว่าจะจำอย่างดีเลยเเหละ 5555555 ก็อยากจะขอบคุณที่ได้เกียมาอยู่ในทีมนะ หน้า Frontend เจ๋งจัด โคตรรรสวยยย อีกยังจะตาม Ref ยากๆ ของ กราฟิก ได้อีก โคตรอึ้งง
									อยากทำได้บ้างจัง 😍 ขอบคุณที่อยู่ช่วยในวันงานด้วย อย่างที่พี่เขาบอกว่าเลือกได้ว่าจะทำเว็ปเเล้วอาจจะไม่ไปวันค่ายได้ เเต่ก็ขอบคุณมากๆ ที่มาช่วยวันค่ายด้วยกันด้วย เเละก็หวังว่าจะได้ร่วมงานกันอีกนะ 🥳{" "}
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
