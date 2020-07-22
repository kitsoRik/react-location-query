import { getOptions } from '../../stores/options/options';
import CryptoOption from '../../types/Options/CryptoOption';
import compressWithBase64 from './compres/base64/compressWithBase64';
import base64Encrypt from './methods/base64/base64Encrypt';
import xorEncrypt from './methods/xor/xorEncrypt';

const encryptQuery = (query: object) => {
	const jsoned = JSON.stringify(query);

	const option = getOptions().crypto as Exclude<CryptoOption, false>;

	let encrypted = '';
	switch (option.method) {
		case 'base64':
			encrypted = base64Encrypt(jsoned);
			break;
		case 'xor':
			if (option.compessedToBase64)
				encrypted = compressWithBase64(xorEncrypt(jsoned, option.key));
			else encrypted = xorEncrypt(jsoned, option.key);
			break;
		default:
			throw new Error(`Method ${(option as any).method} not implemented`);
	}

	return encrypted;
};

export default encryptQuery;