import { Body, Button, Container, Font, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";

interface AnnouncementEmailProps {
	name: string;
}

const CONFIG = {
	resultLink: "https://comcamp.io/result",
	contactLink: "https://comcamp.io/#contact",
	email: "kmutt.comcamp@gmail.com",
};

export default function AnnouncementEmail({ name }: AnnouncementEmailProps) {
	return (
		<Html>
			<Tailwind>
				<Head>
					<Font fontFamily="Helvetica" fallbackFontFamily="Helvetica" fontWeight={400} fontStyle="normal" />
				</Head>
				<Preview>ประกาศผลการคัดเลือก ComCamp 37</Preview>

				<Body className="bg-white font-sans">
					<Container className="mx-auto w-full max-w-[700px] rounded border border-solid border-[#eaeaea] p-0 my-[40px]">
						{/* --- Main Content --- */}
						<Section className=" px-12 pt-12">
							{/* Logo ComCamp */}
							<Img src="https://comcamp.io/_next/image?url=%2Fstatic%2Fimage%2Flogo.png&w=1200&q=75" width="200" height="auto" alt="ComCamp 37 Logo" className="my-0 mx-auto block" />

							<Section className="text-start mt-8">
								<Heading className="my-10 text-2xl leading-tight font-medium text-black">ประกาศผลการคัดเลือก ComCamp 37</Heading>

								<Text className="text-[1rem] leading-relaxed text-black">
									สวัสดีครับน้อง <strong>{name}</strong>
								</Text>

								<Text className="text-[1rem] leading-relaxed text-black">ขอขอบคุณที่ให้ความสนใจสมัครเข้าร่วมโครงการ ComCamp 37 ขณะนี้ทางค่ายได้ทำการประมวลผลการคัดเลือกเสร็จสิ้นเรียบร้อยแล้ว น้องสามารถตรวจสอบสถานะการคัดเลือกได้โดยกดที่ปุ่มด้านล่างครับ</Text>
							</Section>

							<Section className="mt-8 mb-8">
								<Button className="box-border w-full rounded-[8px] bg-[#F15A29] hover:bg-[#d64b1f] px-[12px] py-[14px] text-center font-semibold text-white no-underline block" href={CONFIG.resultLink}>
									ตรวจสอบสถานะการคัดเลือก
								</Button>
								<Text className="text-[0.85rem] text-gray-500 text-center mt-3">*กรุณาตรวจสอบและยืนยันสิทธิ์ภายในเวลาที่กำหนด</Text>
							</Section>
						</Section>

						{/* --- Footer --- */}
						<Section className="px-12 pb-12 text-sm leading-5">
							<Img src="https://res.cloudinary.com/dynrld3nm/image/upload/cc36preorder/kmutt-cpe-logo_lyyokm.png" width="144" height="80" alt="KMUTT CPE Logo" className="my-0 mb-4" />

							<Text className="text-[0.8rem] text-gray-500">© 2026 ComCamp 37. Computer Engineering Department, King Mongkut&apos;s University of Technology Thonburi, 126 Pracha Uthit Rd, Bang Mot, Thung Khru, Bangkok 10140</Text>

							<Text className="text-center text-[0.8rem] text-gray-500 mt-6 pt-6 border-t border-gray-100">
								อีเมลฉบับนี้ถูกส่งโดยระบบอัตโนมัติ โปรดอย่าตอบกลับ หากมีข้อสงสัยสามารถติดต่อทีมงานได้ที่{" "}
								<Link href={`mailto:${CONFIG.email}`} className="text-[#F15A29]">
									{CONFIG.email}
								</Link>{" "}
								หรือ{" "}
								<Link href={CONFIG.contactLink} className="text-[#F15A29]">
									ช่องทางต่อไปนี้
								</Link>
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
