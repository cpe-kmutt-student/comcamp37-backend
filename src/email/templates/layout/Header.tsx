import { Img, Section } from "@react-email/components";

const CONFIG = {
	logourl:
		"https://media.discordapp.net/attachments/1443169322200600637/1460962868257362109/IMG_5214.png?ex=6977fc73&is=6976aaf3&hm=1773d8562a58e6988130f9abdc46af4ed6c5b0987df8f5285d08fbf6e0b6f5a8&=&format=webp&quality=lossless&width=779&height=779",
};

export const Header = () => {
	return (
		<Section
			className="relative overflow-hidden px-12 text-start"
			style={{
				background: "linear-gradient(135deg, #464f6a 0%, #92a6d2 100%)",
			}}
		>
			<Img src={CONFIG.logourl} width="160" height="auto" alt="ComCamp 37 Logo" className="relative z-10" />
		</Section>
	);
};
