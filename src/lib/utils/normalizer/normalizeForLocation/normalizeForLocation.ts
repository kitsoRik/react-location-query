import {
	getInitialValues,
	getInitialValuesWrapper
} from '../../valuesController/valuesController/valuesController';
import { InitialExtendValues } from '../../../types/Initial/Initial';
import { QueryValues } from '../../../types/Query';
import normalizeJson from './normalizeJson';
import normalizeArray from './normalizeArray';
import normalizeBoolean from '../normalizeBoolean/normalizeBoolean';
import normalizeNumber from '../normalizeNumber/normalizeNumber';
import normalizeString from '../normalizeString/normalizeString';
import { Context } from '../../../context/context';
import removeInitialValues from './removeInitialValues';

const normalizeForLocation = (
	queryValues: QueryValues | InitialExtendValues,
	context: Context
) => {
	const initialValues = getInitialValues(context);
	let locationValues: { [x: string]: string | string[] } = {};
	Object.keys(initialValues).forEach((key) => {
		const value = queryValues[key];
		const initialValue = initialValues[key];
		if (
			!initialValue.active ||
			(typeof initialValue.active === 'object' &&
				!initialValue.active.isActive)
		) {
			return;
		}
		switch (initialValue.type) {
			case 'json':
				locationValues[key] = normalizeJson(value);
				break;
			case 'number':
				locationValues[key] = normalizeNumber(
					value as any,
					initialValue
				).toString();
				break;
			case 'boolean':
				locationValues[key] = normalizeBoolean(
					value as any,
					initialValue
				)
					? 'true'
					: 'false';
				break;
			case 'string':
				locationValues[key] = normalizeString(
					value as any,
					initialValue
				);
				break;
			case 'array':
				locationValues[key] = normalizeArray(
					value as any[],
					initialValue
				);
				break;
			default:
				throw new Error('Unknown behavior error: unknown value');
		}

		const wrapper = getInitialValuesWrapper(key, context);
		wrapper.storedValue = locationValues[key];
	});
	removeUnusedQueryFields(queryValues, locationValues, context);
	locationValues = removeInitialValues(locationValues, context);
	return locationValues;
};

const removeUnusedQueryFields = (
	queryValues: QueryValues | InitialExtendValues,
	locationValues: QueryValues,
	context: Context
) => {
	if (!context.rules.removeUnusedQueryFields) {
		Object.assign(locationValues, { ...queryValues, ...locationValues });
	}
};

export default normalizeForLocation;
