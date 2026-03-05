import { Hr, Img, Link, Section, Text } from "@react-email/components";

export const Footer = () => {
	return (
		<Section className="bg-[#f8f9fc] px-6 py-10 border-t border-[#e8ecf4]">
			<Img src="https://res.cloudinary.com/dynrld3nm/image/upload/cc36preorder/kmutt-cpe-logo_lyyokm.png" width="144" height="80" alt="KMUTT CPE Logo" className="mb-5" />

			<Text className="text-[13px] leading-relaxed text-[#92a6d2] mb-6">
				© 2026 ComCamp 37. Computer Engineering Department,
				<br />
				King Mongkut&apos;s University of Technology Thonburi,
				<br />
				126 Pracha Uthit Rd, Bang Mot, Thung Khru, Bangkok 10140
			</Text>

			<Section className="border-t border-[#e8ecf4] pt-6 text-center">
				<Text className="text-[13px] leading-relaxed text-[#92a6d2] m-0">
					อีเมลฉบับนี้ถูกส่งโดยระบบอัตโนมัติ โปรดอย่าตอบกลับ
					<br />
					หากมีข้อสงสัยสามารถติดต่อทีมงานได้ที่ <br />
					<Link href={`https://comcamp.io/#contact`} className="text-[#e98d55] no-underline font-semibold">
						ติดต่อทีมงาน ComCamp 37
					</Link>
				</Text>
			</Section>
		</Section>
	);
};

export default Footer;
