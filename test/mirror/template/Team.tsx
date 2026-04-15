import { Body, Button, Container, Font, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

const CONFIG = {
	resultLink: "https://line.me/ti/g2/gUcEmk63-LQH-ZIOsu4Hy8OiuOO4ChiOlqqI1g?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
	qrUrl: "https://storage.comcamp.io/public/IMG_0185.jpg",
};

export default function Team() {
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
								<Text className="text-base leading-relaxed m-0">สวัสดีทีม สวัสดีคอมเเคมป์</Text>
							</Section>

							<Section className="">
								<Text className="text-base leading-relaxed indent-16">
									สวัสดีคอมเเคมป์ คอมเเคมป์สามเจ็ด เเหร่ อะไรเนี่ย 5555555 ก็เห็นว่าเป็นคนเงียบๆ นะ ไม่คิดว่าจะปั่นขนาดนี้ 🤣 ขอบคุณทีมมากๆ เลยที่เข้าทีมมานะ ตอนเเรกก็คิดว่า 7 คน ก็เยอะกำลังดี เลย เเต่พอไปๆ มาๆ มันพอดีไปนี่หว่า 555555 🥶 ขอบคุณช่วย สร้างหน้า Frontend ขึ้นมาให้นะ
									โครตรสวยยยยยยย ยิ่งเป็นบางหน้าที่ไม่มี Ref นะ เเล้วต้องคิดเองอ่ะ เจ๋งงงงงสุดๆ 😍 ขอบคุณที่อยู่ช่วยในวันงานด้วย เเล้วก็ขอบคุณ Mirror มากๆ หวังว่าเราจะได้ร่วมงานกันอีกนะ 🥳{" "}
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
