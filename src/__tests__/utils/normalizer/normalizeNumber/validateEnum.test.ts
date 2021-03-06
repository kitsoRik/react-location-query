import validateEnum from '../../../../lib/utils/normalizer/normalizeNumber/validateEnum';

describe('validateEnum', () => {
	it('should should return same value', () => {
		expect(
			validateEnum(1, {
				type: 'number',
				initial: 1,
				enum: [1, 2, 3, 4]
			})
		).toBe(1);

		expect(
			validateEnum(2, {
				type: 'number',
				initial: 1,
				enum: [1, 2, 3, 4]
			})
		).toBe(2);

		expect(
			validateEnum(0, {
				type: 'number',
				initial: -1,
				enum: [0, -1, 2]
			})
		).toBe(0);

		expect(
			validateEnum(-1, {
				type: 'number',
				initial: 2,
				enum: [0, -1, 2]
			})
		).toBe(-1);

		expect(
			validateEnum(2, {
				type: 'number',
				initial: 0,
				enum: [0, -1, 2]
			})
		).toBe(2);
	});

	it('should should return initial value', () => {
		expect(
			validateEnum(0, {
				type: 'number',
				initial: 1,
				enum: [1, 2, 3, 4]
			})
		).toBe(1);

		expect(
			validateEnum(5, {
				type: 'number',
				initial: 2,
				enum: [1, 2, 3, 4]
			})
		).toBe(2);

		expect(
			validateEnum(555, {
				type: 'number',
				initial: 2,
				enum: [0, -1, 2]
			})
		).toBe(2);

		expect(
			validateEnum(122, {
				type: 'number',
				initial: 123,
				enum: [123, 456, 789]
			})
		).toBe(123);

		expect(
			validateEnum(1, {
				type: 'number',
				initial: 0,
				enum: [0]
			})
		).toBe(0);
	});

	it('should should return onNonEnum value', () => {
		expect(
			validateEnum(0, {
				type: 'number',
				initial: 1,
				enum: {
					array: [1, 2, 3, 4],
					onNonEnum: () => 2
				}
			})
		).toBe(2);

		expect(
			validateEnum(5, {
				type: 'number',
				initial: 2,
				enum: {
					array: [1, 2, 3, 4],
					onNonEnum: () => 4
				}
			})
		).toBe(4);

		expect(
			validateEnum(-2, {
				type: 'number',
				initial: 2,
				enum: {
					array: [0, -1, 2],
					onNonEnum: () => -1
				}
			})
		).toBe(-1);

		expect(
			validateEnum(122, {
				type: 'number',
				initial: 123,
				enum: {
					array: [123, 456, 789],
					onNonEnum: () => 456
				}
			})
		).toBe(456);

		expect(
			validateEnum(1, {
				type: 'number',
				initial: 0,
				enum: {
					array: [0],
					onNonEnum: () => 0
				}
			})
		).toBe(0);
	});
});
