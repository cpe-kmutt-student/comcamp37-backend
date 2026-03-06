import { Body, Container, Font, Head, Heading, Html, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

interface TicketSolvedEmailProps {
	name: string;
	ticketId: string;
	ticketMessage: string;
	resolution?: string;
}

export default function TicketSolvedEmail({ name, ticketId, ticketMessage, resolution }: TicketSolvedEmailProps) {
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
				<Preview>Ticket #{ticketId} ได้รับการแก้ไขแล้ว!</Preview>

				<Body className="bg-white font-sans">
					<Container className="mx-auto w-full max-w-[800px] my-10 bg-white rounded-2xl overflow-hidden shadow-lg">
						<Header />

						<Section className="bg-white px-6 py-8 text-center">
							<Heading className="text-sm font-semibold text-[#1d3071] m-0 mb-2 tracking-widest uppercase" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
								Ticket
							</Heading>
							<Text className="text-2xl font-bold m-0 text-[#4caf50]">ได้รับการแก้ไขแล้ว!</Text>
						</Section>

						<Section className="px-6 pb-10 pt-4">
							<Section className="bg-[#004aad]/20 border-l-4 border-[#1d3071] rounded-lg px-6 py-5 mb-8">
								<Text className="text-base leading-relaxed text-[#004aad] m-0">
									สวัสดีครับน้อง <strong className="text-[#504039]">{name}</strong>
								</Text>
							</Section>

							<Section className="bg-[#e8f5e9] border-2 border-[#4caf50] rounded-xl px-6 py-6 mb-8 text-center">
								<Text className="text-lg font-bold text-[#2e7d32] m-0">Ticket ของน้องได้รับการแก้ไขเรียบร้อยแล้ว!</Text>
							</Section>

							<Section className="bg-[#f5f5f5] border-2 border-[#e0e0e0] rounded-xl px-6 py-6 mb-8">
								<Text className="text-sm font-bold text-[#616161] m-0 mb-3">🎫 รายละเอียด Ticket:</Text>
								<Text className="text-sm leading-relaxed text-[#504039] m-0 mb-2">
									<strong>หมายเลข Ticket:</strong> #{ticketId}
								</Text>
								{ticketMessage && (
									<Text className="text-sm leading-relaxed text-[#504039] m-0">
										<strong>รายละเอียด:</strong> {ticketMessage}
									</Text>
								)}
							</Section>

							{resolution && (
								<Section className="bg-[#f5f5f5] border-2 border-[#e0e0e0] rounded-xl px-6 py-6 mb-8">
									<Text className="text-sm font-bold text-[#616161] m-0 mb-3">ข้อความจากทีมงาน:</Text>
									<Text className="text-sm leading-relaxed text-[#504039] m-0 mb-2">{resolution}</Text>
								</Section>
							)}

							<Text className="text-base leading-relaxed text-[#504039] mb-6">
								หาก Ticket นี้ยังไม่ได้รับการแก้ไขตามที่คาดหวัง หรือมีคำถามเพิ่มเติม กรุณาติดต่อทีมงาน <strong>ComCamp 37</strong> ได้ทุกช่องทาง
							</Text>

							<Text className="text-base leading-relaxed text-[#504039] mb-6 text-center">ขอบคุณที่แจ้งปัญหามาให้ทีมงานทราบครับ 🙏</Text>

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
