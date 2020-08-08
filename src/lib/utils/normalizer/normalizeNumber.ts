import { ObjectNumber } from '../../types/Initial/Number';

const normalizeNumber = (
	value: number | string | string[] | ObjectNumber,
	initialValue: ObjectNumber
): number => {
	if (Array.isArray(value)) return normalizeNumber(value[0], initialValue);

	let newValue = validateInitial(value, initialValue);
	newValue = validateNumber(newValue, initialValue);
	newValue = validateEnum(newValue, initialValue);
	newValue = validateInteger(newValue, initialValue);
	newValue = validateMinMax(newValue, initialValue);
	newValue = validate(newValue, initialValue);

	return newValue;
};

export default normalizeNumber;

const validateInitial = (
	value: string | number | ObjectNumber,
	initialValue: ObjectNumber
): string | number => {
	if (typeof value === 'object' && 'type' in value)
		return initialValue.initial;
	return value;
};

const validateNumber = (
	value: number | string,
	initialValue: ObjectNumber
): number => {
	if (isNaN(+value)) {
		if (initialValue.onParsedError) {
			const newValue = initialValue.onParsedError(value as string);
			if (isNaN(newValue) || typeof newValue !== 'number')
				throw new Error(
					`onParsedError for type 'number' must returns number, but return '${newValue}'`
				);
			return newValue;
		} else {
			return initialValue.initial;
		}
	}

	return +value;
};

const validateEnum = (value: number, initialValue: ObjectNumber) => {
	if ('enum' in initialValue) {
		if (!initialValue.enum.includes(value)) {
			if (initialValue.onParsedEnumError) {
				const newValue = initialValue.onParsedEnumError(value);

				if (!initialValue.enum.includes(newValue)) {
					throw new Error(
						`'${newValue}' not contains in enum array ${initialValue.enum}, but you passed it`
					);
				}

				return newValue;
			} else {
				return initialValue.initial;
			}
		}
	}

	return value;
};

const validateInteger = (value: number, initialValue: ObjectNumber) => {
	if ('integer' in initialValue) {
		if (!Number.isInteger(value)) {
			if (initialValue.onParsedIntegerError) {
				const newValue = initialValue.onParsedIntegerError(value);
				if (!Number.isInteger(newValue)) {
					throw new Error(
						`onParsedIntegerError returned non-integer value, received ${newValue}`
					);
				}
				return newValue;
			} else {
				return Math.floor(value);
			}
		}
	}

	return value;
};

const validateMinMax = (value: number, initialValue: ObjectNumber): number => {
	if (initialValue.min !== undefined) {
		if (value < initialValue.min) {
			return initialValue.min;
		}
	}

	if (initialValue.max !== undefined) {
		if (value < initialValue.max) {
			return initialValue.max;
		}
	}

	return value;
};

const validate = (value: number, initialValue: ObjectNumber): number => {
	if (initialValue.validate) {
		return initialValue.validate(value);
	}
	return value;
};
