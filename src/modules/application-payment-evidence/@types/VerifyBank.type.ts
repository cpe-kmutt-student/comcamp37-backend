// Request Types
export interface VerifyBankRequest {
	// One of the following is required
	payload?: string; // QR payload (1-128 chars)
	image?: File; // Image file (multipart/form-data)
	base64?: string; // Base64 encoded image
	url?: string; // URL to image (1-2048 chars)

	// Optional parameters
	remark?: string; // 1-255 chars
	matchAccount?: boolean;
	matchAmount?: number;
	checkDuplicate?: boolean;
}

// Response Types
export interface VerifyBankResponse {
	success: true;
	data: VerifyBankData;
	message: string;
}

export interface VerifyBankData {
	remark?: string;
	isDuplicate: boolean;
	matchedAccount: MatchedAccount | null;
	amountInOrder?: number;
	amountInSlip: number;
	isAmountMatched?: boolean;
	rawSlip: RawSlip;
}

export interface MatchedAccount {
	bank: {
		nameTh: string;
		nameEn: string;
		code: string;
		shortCode: string;
	};
	nameTh: string;
	nameEn: string;
	type: "PERSONAL" | "JURISTIC";
	bankNumber: string;
}

export interface RawSlip {
	payload: string;
	transRef: string;
	date: string; // ISO 8601
	countryCode: string;
	amount: Amount;
	fee: number;
	ref1: string;
	ref2: string;
	ref3: string;
	sender: Party;
	receiver: Party & { merchantId?: string | null };
}

export interface Amount {
	amount: number;
	local: {
		amount: number;
		currency: string;
	};
}

export interface Party {
	bank: {
		id: string;
		name: string;
		short: string;
	};
	account: {
		name: {
			th?: string;
			en?: string;
		};
		bank?: {
			type: "BANKAC" | "TOKEN" | "DUMMY";
			account: string;
		};
		proxy?: {
			type: "NATID" | "MSISDN" | "EWALLETID" | "EMAIL" | "BILLERID";
			account: string;
		};
	};
}

// Error Response
export interface ErrorResponse {
	success: false;
	error: {
		code: string;
		message: string;
	};
}
