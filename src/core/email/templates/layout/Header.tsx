import { Img, Section } from "@react-email/components";

const CONFIG = {
	logourl: "https://res.cloudinary.com/diuembxjq/image/upload/v1769431128/cc37-logo_ipji4s.png",
};

export const Header = () => {
	return (
		<Section
			className="relative overflow-hidden px-12 text-center"
			style={{
				background: "linear-gradient(135deg, #1d3071 0%, #004aad 100%)",
			}}
		>
			<Img src={CONFIG.logourl} width="160" height="auto" alt="ComCamp 37 Logo" className="mx-auto relative z-10" />
		</Section>
	);
};

export default Header;
