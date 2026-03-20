import { Img, Section } from "@react-email/components";

const CONFIG = {
	logourl: "https://storage.comcamp.io/web-assets/1.png",
};

export const Header = () => {
	return (
		<Section>
			<Img src={CONFIG.logourl} style={{ width: "auto", height: "100%", maxHeight: "212px" }} alt="ComCamp 37 Logo" className="mx-auto relative z-10" />
		</Section>
	);
};

export default Header;
