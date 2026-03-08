import { Body, Container, Font, Head, Heading, Html, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

interface GeneralContentEmailProps {
	name: string;
	subject: string;
	content: string;
	sender?: string;
}

export default function GeneralContentEmail({ name, subject, content, sender }: GeneralContentEmailProps) {
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
				<Preview>{subject}</Preview>

				<Body className="bg-white font-sans">
					<Container className="mx-auto w-full max-w-[800px] my-10 bg-white rounded-2xl overflow-hidden shadow-lg">
						<Header />

						{/* <Section className="bg-white px-6 py-8 text-center">
							<Text className="text-2xl font-bold m-0 text-[#004aad]">{subject}</Text>
						</Section> */}

						<Section className="px-6 pb-10 pt-4">
							<Section className="bg-[#004aad]/20 border-l-4 border-[#1d3071] rounded-lg px-6 py-5 mb-8">
								<Text className="text-base leading-relaxed text-[#004aad] m-0">
									สวัสดีครับน้อง <strong className="text-[#504039]">{name}</strong>
								</Text>
							</Section>

							<Section className="bg-[#f8f9fc] border-2 border-[#e0e0e0] rounded-xl px-6 py-6 mb-8">
								<Text className="text-base leading-relaxed text-[#504039] m-0 whitespace-pre-wrap">{content}</Text>
							</Section>
							{sender && (
								<Section className="text-right mb-6">
									<Text className="text-base text-[#504039] m-0">จากพี่</Text>
									<Text className="text-base font-semibold text-[#1d3071] m-0 mt-1">{sender}</Text>
								</Section>
							)}
							<Text className="text-base leading-relaxed text-[#504039] mb-6 text-center">
								หากมีข้อสงสัยเพิ่มเติม สามารถติดต่อทีมงาน <strong>ComCamp 37</strong> ได้ทุกช่องทาง
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
