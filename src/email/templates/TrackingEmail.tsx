import { Body, Button, Container, Font, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

interface TrackingEmailProps {
	name: string;
	orderId: string;
	trackingNumber: string;
	provider: string;
}

const CONFIG = {
	trackingurl: "https://track.thailandpost.co.th/?trackNumber=",
};

export default function TrackingEmail({ name, orderId, trackingNumber, provider }: TrackingEmailProps) {
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
				<Preview>📦 พัสดุของน้องถูกจัดส่งแล้ว! - ComCamp 37</Preview>

				<Body className="bg-white font-sans">
					<Container className="mx-auto w-full max-w-[800px] my-10 bg-white rounded-2xl overflow-hidden shadow-lg">
						<Header />

						<Section className="bg-white px-6 py-8 text-center">
							<Heading className="text-sm font-semibold text-[#92a6d2] m-0 mb-2 tracking-widest uppercase" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
								COMCAMP 37
							</Heading>
							<Text className="text-2xl font-bold m-0 text-[#464f6a]">พัสดุถูกจัดส่งแล้ว! 📦</Text>
						</Section>

						<Section className="px-6 pb-10 pt-4">
							<Section className="bg-[#f8f9fc] border-l-4 border-[#e98d55] rounded-lg px-6 py-5 mb-8">
								<Text className="text-base leading-relaxed text-[#464f6a] m-0">
									สวัสดีครับน้อง <strong className="text-[#504039]">{name}</strong> 📦
								</Text>
							</Section>

							<Text className="text-base leading-relaxed text-[#504039] mb-6">ทางทีมงาน ComCamp 37 ได้ทำการจัดส่งพัสดุของน้องเรียบร้อยแล้วครับ! น้องสามารถติดตามสถานะการจัดส่งได้ตามข้อมูลด้านล่าง</Text>

							<Section className="bg-[#f0f4ff] border-2 border-[#92a6d2] rounded-xl px-6 py-6 mb-8">
								<Text className="text-lg font-bold text-[#464f6a] m-0 mb-4 text-center">📋 รายละเอียดการจัดส่ง</Text>

								<table
									style={{
										width: "100%",
										borderCollapse: "collapse",
									}}
								>
									<tr>
										<td
											style={{
												padding: "10px 0",
												borderBottom: "1px solid #e8ecf4",
												color: "#92a6d2",
												fontSize: "14px",
												width: "40%",
											}}
										>
											หมายเลขคำสั่งซื้อ
										</td>
										<td
											style={{
												padding: "10px 0",
												borderBottom: "1px solid #e8ecf4",
												color: "#504039",
												fontSize: "14px",
												fontWeight: "bold",
											}}
										>
											{orderId}
										</td>
									</tr>
									<tr>
										<td
											style={{
												padding: "10px 0",
												borderBottom: "1px solid #e8ecf4",
												color: "#92a6d2",
												fontSize: "14px",
											}}
										>
											ผู้ให้บริการขนส่ง
										</td>
										<td
											style={{
												padding: "10px 0",
												borderBottom: "1px solid #e8ecf4",
												color: "#504039",
												fontSize: "14px",
												fontWeight: "bold",
											}}
										>
											{provider}
										</td>
									</tr>
									<tr>
										<td
											style={{
												padding: "10px 0",
												color: "#92a6d2",
												fontSize: "14px",
											}}
										>
											หมายเลขพัสดุ
										</td>
										<td
											style={{
												padding: "10px 0",
												color: "#e98d55",
												fontSize: "16px",
												fontWeight: "bold",
												fontFamily: "monospace",
												letterSpacing: "1px",
											}}
										>
											{trackingNumber}
										</td>
									</tr>
								</table>
							</Section>

							<Section className="text-center my-9">
								<Button
									className="inline-block text-[#504039] text-base font-bold px-12 py-4 rounded-full no-underline tracking-wide"
									style={{
										background: "linear-gradient(135deg, #e98d55 0%, #f2d575 100%)",
										boxShadow: "0 4px 16px rgba(233, 141, 85, 0.3)",
									}}
									href={`${CONFIG.trackingurl}${trackingNumber}`}
								>
									ติดตามพัสดุ
								</Button>

								<Text className="text-[13px] text-[#92a6d2] mt-4 mb-0 italic">*คลิกปุ่มด้านบนเพื่อตรวจสอบสถานะการจัดส่ง</Text>
							</Section>

							<Section className="bg-[#fff8f0] border-2 border-dashed border-[#f2d575] rounded-xl px-5 py-5 mb-8">
								<Text className="text-sm font-bold text-[#e98d55] m-0 mb-3 text-center">🚚 ข้อมูลการจัดส่ง</Text>
								<Text className="text-sm leading-relaxed text-[#504039] m-0 text-center">
									ระยะเวลาจัดส่งโดยประมาณ: <strong>2-5 วันทำการ</strong>
									<br />
									กรุณาตรวจสอบความถูกต้องของพัสดุก่อนเซ็นรับ
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
