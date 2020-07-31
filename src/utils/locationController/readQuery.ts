import { QueryValues } from '../../types/Query';
import { getLocation } from '../../stores/store/store';
import decryptQuery from '../crypto/decryptQuery';
import { Location } from '../../types/HistoryLocation';
import qs from 'querystring';
import Options from '../../types/Options';

const readQuery = (options: Options): QueryValues => {
	const location: Location = getLocation();
	return parseQuery(location.search, options);
};

export default readQuery;

const parseQuery = (query: string, options: Options): QueryValues => {
	try {
		const q = qs.parse(query === '' ? '' : query.substring(1));
		if (options.crypto) {
			if (q.q as any) return decryptQuery(q.q as any, options);
			return {};
		}
		return q;
	} catch (e) {
		return {};
	}
};
